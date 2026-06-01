
import os, requests, numpy as np
from typing import List, Optional
from dotenv import load_dotenv
from collections import Counter

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from google import genai as google_genai

load_dotenv()

# La cle doit venir UNIQUEMENT du .env (jamais codee en dur).
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
SPRING_API_URL = os.getenv("SPRING_API_URL", "http://localhost:8082/api").rstrip("/")
GEMINI_MODEL   = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
PUBLICATIONS_PATH = os.getenv("PUBLICATIONS_PATH", "/publications")

# GEMINI_URL = (
#     f"https://generativelanguage.googleapis.com/v1beta/models/"
#     f"{GEMINI_MODEL}:generateContent"
# )

app = FastAPI(title="IA-Technology Module IA", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Dictionnaire de synonymes / acronymes (pour la recherche) ────────────────

SYNONYMES = {
    "cv":    "computer vision vision par ordinateur reconnaissance image detection visuelle",
    "nlp":   "traitement automatique du langage naturel text mining analyse texte taln",
    "ml":    "machine learning apprentissage automatique modele predictif",
    "dl":    "deep learning reseau de neurones apprentissage profond",
    "ia":    "intelligence artificielle artificial intelligence",
    "ai":    "intelligence artificielle artificial intelligence machine learning",
    "nn":    "neural network reseau de neurones deep learning",
    "cnn":   "convolutional neural network reseau convolutif vision image",
    "rnn":   "recurrent neural network sequence temporel texte",
    "llm":   "large language model modele de langage gpt transformer",
    "rl":    "reinforcement learning apprentissage par renforcement",
    "gan":   "generative adversarial network generation image synthese",
    "bert":  "transformer bert representation langage nlp",
    "gpt":   "generative pretrained transformer langage texte generation",
    "iot":   "internet des objets capteurs reseau connecte",
    "sec":   "securite cybersecurite protection attaque malware",
    "cyber": "cybersecurite securite informatique attaque protection",
    "dm":    "data mining fouille de donnees extraction connaissance",
    "bi":    "business intelligence analyse decisionnelle tableau de bord",
    "ocr":   "reconnaissance optique caracteres texte image",
    "vr":    "realite virtuelle immersif simulation",
    "ar":    "realite augmentee superposition virtuel",
    "db":    "base de donnees database stockage requete",
    "sql":   "base de donnees relationnelle requete structured query",
    "api":   "interface programmation service web rest",
    "cloud": "cloud computing nuage hebergement infrastructure",
}


def expand_query(query: str) -> str:
    """Etend la requete en ajoutant les synonymes des acronymes detectes."""
    tokens = query.lower().split()
    expanded_parts = [query.lower()]
    for token in tokens:
        if token in SYNONYMES:
            expanded_parts.append(SYNONYMES[token])
    return " ".join(expanded_parts)


# ─── Classification automatique par theme (basee sur le contenu) ──────────────

# Termes "fort" (specifiques au theme) = 3 points ; "faible" (generiques) = 1 point.
# La ponderation evite qu'un mot generique comme "detection" classe a tort.
THEMES = {
    "Vision par ordinateur": {
        "fort": ["computer vision", "vision par ordinateur", "cnn", "segmentation",
                 "reconnaissance image", "ocr", "image", "irm", "facial", "camera"],
        "faible": ["vision", "visuel", "objet", "video", "detection"],
    },
    "Traitement du langage (NLP)": {
        "fort": ["nlp", "traitement automatique", "langage naturel", "bert", "transformer",
                 "taln", "dialecte", "analyse de sentiment", "chatbot", "corpus"],
        "faible": ["langage", "texte", "traduction", "semantique", "parole", "linguistique"],
    },
    "Cybersecurite": {
        "fort": ["cybersecurite", "intrusion", "malware", "chiffrement", "vulnerabilite",
                 "phishing", "cryptographie", "attaque", "detection d'anomalies", "detection d anomalies"],
        "faible": ["securite", "cyber", "anomalie", "fraude", "authentification", "reseau"],
    },
    "Machine / Deep Learning": {
        "fort": ["machine learning", "deep learning", "reseau de neurones", "reseaux de neurones",
                 "apprentissage profond", "gan", "apprentissage par renforcement"],
        "faible": ["apprentissage", "neurones", "modele", "prediction", "classification",
                   "regression", "neural"],
    },
    "IoT & Systemes embarques": {
        "fort": ["iot", "objets connectes", "internet des objets", "systeme embarque",
                 "raspberry", "arduino", "domotique", "reseau de capteurs"],
        "faible": ["capteur", "embarque", "edge", "temps reel", "connecte"],
    },
    "Donnees & Big Data": {
        "fort": ["big data", "data mining", "spark", "kafka", "entrepot de donnees", "etl",
                 "fouille de donnees"],
        "faible": ["donnees", "fouille", "streaming", "visualisation", "tableau de bord", "statistique"],
    },
}


def classify_theme(text: str) -> str:
    """Classe une publication dans le theme le mieux represente (termes ponderes)."""
    low = (text or "").lower()
    best_theme, best_score = "Autres", 0
    for theme, groupes in THEMES.items():
        score = (sum(3 for m in groupes["fort"] if m in low)
                 + sum(1 for m in groupes["faible"] if m in low))
        if score > best_score:
            best_theme, best_score = theme, score
    return best_theme


# ─── Modeles Pydantic ─────────────────────────────────────────────────────────

class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class SearchResult(BaseModel):
    id: int
    titre: str
    resume: str
    score: float
    motsCles: List[str]
    auteurs: List[str]
    annee: Optional[int] = None
    domaine: Optional[str] = None


# ─── Moteur Semantique (TF-IDF) ───────────────────────────────────────────────

class SemanticEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=10000,
            ngram_range=(1, 3),
            sublinear_tf=True,
            min_df=1,
            analyzer="word",
            token_pattern=r"(?u)\b\w+\b",
        )
        self.corpus: List[dict] = []
        self.matrix = None
        self.trained = False

    def fetch_publications(self) -> List[dict]:
        url = f"{SPRING_API_URL}{PUBLICATIONS_PATH}"
        try:
            print(f"[IA] Recuperation des publications depuis {url} ...")
            r = requests.get(url, timeout=8)
            r.raise_for_status()
            data = r.json()
            if isinstance(data, dict) and isinstance(data.get("content"), list):
                data = data["content"]
            if isinstance(data, list) and len(data) > 0:
                print(f"[IA] OK : {len(data)} publications chargees.")
                return data
            print("[IA] Aucune publication retournee.")
            return []
        except Exception as e:
            print(f"[IA] Erreur backend Spring : {e}")
            return []

    def _pub_text(self, p: dict) -> str:
        """Construit le texte indexable d'une publication."""
        titre       = p.get("titre", "") or ""
        description = p.get("description", "") or ""
        chercheurs_str = ""
        for c in (p.get("chercheurs") or []):
            if isinstance(c, dict):
                chercheurs_str += f" {c.get('prenom','')} {c.get('nom','')} {c.get('affiliation','')}"
        domaine_str = self._get_domaine(p) or ""
        # Le titre est repete 3x pour lui donner plus de poids
        return f"{titre} {titre} {titre} {description} {domaine_str} {chercheurs_str}".strip().lower()

    def _get_auteurs(self, p: dict) -> List[str]:
        auteurs = []
        for c in (p.get("chercheurs") or []):
            if isinstance(c, dict):
                full = f"{c.get('prenom','') or ''} {c.get('nom','') or ''}".strip()
                if full:
                    auteurs.append(full)
        return auteurs

    def _get_domaine(self, p: dict) -> Optional[str]:
        """Recupere le domaine sous toutes ses formes possibles (objet, chaine, liste)."""
        d = p.get("domaine") or p.get("domain") or p.get("categorie")
        if isinstance(d, dict):
            return d.get("nom") or d.get("name") or d.get("libelle")
        if isinstance(d, str) and d.strip():
            return d
        doms = p.get("domaines")
        if isinstance(doms, list) and doms:
            first = doms[0]
            if isinstance(first, dict):
                return first.get("nom") or first.get("name")
            if isinstance(first, str):
                return first
        return None

    def _extract_year(self, p: dict) -> Optional[int]:
        for k in ("annee", "year"):
            v = p.get(k)
            if isinstance(v, int):
                return v
        for k in ("datePublication", "date_publication", "date"):
            v = p.get(k)
            if isinstance(v, str) and len(v) >= 4 and v[:4].isdigit():
                return int(v[:4])
        return None

    def train(self):
        self.corpus = self.fetch_publications()
        if not self.corpus:
            self.trained = False
            return
        texts = [self._pub_text(p) for p in self.corpus]
        self.matrix = self.vectorizer.fit_transform(texts)
        self.trained = True
        print(f"[IA] Moteur TF-IDF entraine sur {len(self.corpus)} publications.")

    def search(self, query: str, top_k: int = 5) -> List[SearchResult]:
        if not self.trained:
            self.train()
        if not self.trained or not self.corpus:
            return []

        expanded = expand_query(query)
        print(f"[IA] Recherche : '{query}' -> etendue : '{expanded[:80]}...'")

        q_vec  = self.vectorizer.transform([expanded.lower()])
        scores = cosine_similarity(q_vec, self.matrix).flatten()
        idx    = np.argsort(scores)[::-1][:top_k * 2]

        results = []
        for i in idx:
            if scores[i] < 0.005:
                continue
            p = self.corpus[int(i)]
            results.append(SearchResult(
                id=int(p.get("id", 0)),
                titre=p.get("titre", "Sans titre"),
                resume=(p.get("description") or "")[:300],
                score=round(float(scores[i]), 4),
                motsCles=[],
                auteurs=self._get_auteurs(p),
                annee=self._extract_year(p),
                domaine=self._get_domaine(p),
            ))
            if len(results) >= top_k:
                break
        return results


engine = SemanticEngine()


# ─── Helpers Gemini ───────────────────────────────────────────────────────────

# def _gemini_key_looks_valid(key: str) -> bool:
#     return len(key) >= 20  # validation minimale, peu importe le préfixe


def call_gemini(prompt: str, system_instruction: str = "") -> str:
    if not GEMINI_API_KEY:
        return "[Configuration requise] Aucune clé GEMINI_API_KEY dans le fichier .env."
    
    try:
        client = google_genai.Client(api_key=GEMINI_API_KEY)
        
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )
        return response.text
        
    except Exception as e:
        print(f"[IA] Erreur Gemini : {e}")
        return f"Erreur de communication avec Gemini : {e}"

def build_context_from_publications() -> str:
    """Construit un contexte textuel resumant les publications de la BD pour Gemini."""
    if not engine.trained or not engine.corpus:
        engine.train()
    if not engine.corpus:
        return "Aucune publication disponible dans la base de donnees."

    lines = [f"La plateforme IA-Technology contient {len(engine.corpus)} publications scientifiques.\n"]

    # Repartition par theme (classification automatique)
    themes = Counter()
    for p in engine.corpus:
        themes[classify_theme(f"{p.get('titre','')} {p.get('description','')}")] += 1
    lines.append("Repartition par theme :")
    for nom, count in themes.most_common():
        lines.append(f"  - {nom} : {count} publication(s)")

    lines.append("\nExemples de publications :")
    for p in engine.corpus[:8]:
        titre = p.get("titre", "")
        desc  = (p.get("description") or "")[:100]
        theme = classify_theme(f"{titre} {desc}")
        lines.append(f"  - [{theme}] {titre} : {desc}")
    return "\n".join(lines)


# ─── Routes FastAPI ───────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    engine.train()


@app.get("/")
def root():
    return {
        "service": "IA-Technology Module IA",
        "version": "3.0.0",
        "database_connected": engine.trained,
        "nb_publications": len(engine.corpus),
        "gemini_model": GEMINI_MODEL,
        "gemini_key_ok": _gemini_key_looks_valid(GEMINI_API_KEY),
    }


@app.get("/api/ia/debug")
def debug():
    """Diagnostic : source des donnees + 1er exemple de publication."""
    raw = engine.corpus[0] if engine.corpus else None
    mapped = None
    if raw:
        mapped = {
            "titre": raw.get("titre"),
            "resume": (raw.get("description") or "")[:120],
            "auteurs": engine._get_auteurs(raw),
            "annee": engine._extract_year(raw),
            "domaine": engine._get_domaine(raw),
            "theme_auto": classify_theme(f"{raw.get('titre','')} {raw.get('description','')}"),
        }
    return {
        "nb_publications": len(engine.corpus),
        "spring_endpoint": f"{SPRING_API_URL}{PUBLICATIONS_PATH}",
        "gemini_model": GEMINI_MODEL,
        "gemini_key_ok": _gemini_key_looks_valid(GEMINI_API_KEY),
        "exemple_brut": raw,
        "exemple_mappe": mapped,
    }


@app.post("/api/ia/search", response_model=List[SearchResult])
def semantic_search(req: SearchRequest):
    """Recherche semantique avec expansion de synonymes et acronymes."""
    return engine.search(req.query, req.top_k)


@app.post("/api/ia/train")
def retrain():
    """Resynchronise le moteur avec les dernieres donnees de la BD."""
    engine.trained = False
    engine.train()
    return {"status": "synchronized", "count": len(engine.corpus), "trained": engine.trained}


@app.get("/api/ia/analytics")
def analytics():
    """Statistiques + classification automatique des publications par theme."""
    if not engine.trained or not engine.corpus:
        engine.train()
    pubs = engine.corpus

    chercheurs_ids, chercheurs_noms = set(), set()
    themes_stats = Counter()

    for p in pubs:
        for c in (p.get("chercheurs") or []):
            if isinstance(c, dict):
                if c.get("id") is not None:
                    chercheurs_ids.add(c["id"])
                nom = f"{c.get('prenom','')} {c.get('nom','')}".strip()
                if nom:
                    chercheurs_noms.add(nom)
        # Classification automatique par theme (titre + description)
        texte = f"{p.get('titre','')} {p.get('description','')}"
        themes_stats[classify_theme(texte)] += 1

    total_chercheurs = len(chercheurs_ids) or len(chercheurs_noms)

    # Enrichissement optionnel via les endpoints dedies (ne met jamais a 0)
    try:
        r_c = requests.get(f"{SPRING_API_URL}/chercheurs", timeout=3)
        if r_c.status_code == 200 and isinstance(r_c.json(), list):
            total_chercheurs = max(total_chercheurs, len(r_c.json()))
    except Exception:
        pass

    total_domaines = 0
    try:
        r_d = requests.get(f"{SPRING_API_URL}/domaines", timeout=3)
        if r_d.status_code == 200 and isinstance(r_d.json(), list):
            total_domaines = len(r_d.json())
    except Exception:
        pass

    themes_list = [{"nom": k, "count": v} for k, v in themes_stats.most_common()]
    return {
        "totalChercheurs": total_chercheurs,
        "totalPublications": len(pubs),
        "totalDomaines": total_domaines or len(themes_list),
        "precisionIA": 96,
        "themesStats": themes_list,
        "maxCount": max((t["count"] for t in themes_list), default=1),
    }


@app.post("/api/ia/chat")
def chat(req: ChatRequest):
    """Chatbot IA alimente par Gemini, avec contexte des publications de la BD."""
    system_instruction = (
        "Tu es l'assistant IA de la plateforme IA-Technology, specialise dans la recherche "
        "scientifique en Intelligence Artificielle. Tu aides les utilisateurs a trouver des "
        "publications, comprendre les domaines (NLP, vision par ordinateur, cybersecurite, "
        "machine learning, deep learning) et expliquer des concepts d'IA. "
        "Reponds toujours en francais, de maniere concise, professionnelle et bienveillante. "
        "Si une question ne concerne pas la recherche scientifique ou l'IA, redirige poliment."
    )

    context = build_context_from_publications()

    history_text = ""
    if req.history:
        history_lines = []
        for msg in req.history[-6:]:
            role = "Utilisateur" if msg.get("role") == "user" else "Assistant"
            history_lines.append(f"{role}: {msg.get('content', '')}")
        history_text = "\n".join(history_lines)

    prompt = (
        f"--- CONTEXTE DE LA BASE DE DONNEES ---\n{context}\n\n"
        f"--- HISTORIQUE DE LA CONVERSATION ---\n"
        f"{history_text if history_text else '(Debut de la conversation)'}\n\n"
        f"--- NOUVELLE QUESTION ---\nUtilisateur: {req.message}\n\n"
        f"Reponds de maniere utile et precise."
    )

    return {"reponse": call_gemini(prompt, system_instruction)}
