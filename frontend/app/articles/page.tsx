"use client";
import { useState, useEffect } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import { z } from "zod";
import Chatbot from "@/components/ChatbotSidebar/Chatbot";

async function getArticles(query = "", sort = "desc") {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (sort) params.append("sort", sort);
    const res = await fetch(`/api/articles?${params.toString()}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Erreur serveur (${res.status})`);
    return res.json();
}
const searchSchema = z
    .string()
    .max(15)
    .regex(
        /^[a-zA-Z0-9À-ÿ\s\-_'"]*$/,
        "Le champ recherche ne doit pas contenir de caractères spéciaux, balises HTML ou caractères d'injection."
    );
export default function ArticlesPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 3;

    // Recherche et tri
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const result = searchSchema.safeParse(value);
        if (!result.success) {
            setSearchError(result.error.issues[0].message);
        } else {
            setSearchError(null);
            setSearch(value);
        }
    };
    // Fetch à chaque changement de recherche ou tri
    useEffect(() => {
        setLoading(true);
        setError(null);
        getArticles(search, sortOrder)
            .then(setArticles)
            .catch((err) => {
                setError(err.message || "Erreur inconnue");
                setArticles([]);
            })
            .finally(() => {
                setTimeout(() => setLoading(false), 700);
            });
        setCurrentPage(1);
    }, [search, sortOrder]);

    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIdx = (currentPage - 1) * articlesPerPage;
    const paginatedArticles = articles.slice(startIdx, startIdx + articlesPerPage);


    return (
        <main className="container-fluid p-5">
            <h1 className="titre">📰 Liste des articles</h1>

            {/* Popup d'erreur */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Erreur :</strong> {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                        onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="row">
                {/* Colonne principale */}
                <div className="col-md-8">
                    {/* Filtre */}
                    <div className="row filtre mb-4">
                        <div className="col-md-8 mb-2 mb-md-0">
                            <div className="input-group">
                                <input
                                    key="search-input"
                                    type="text"
                                    className="form-control"
                                    placeholder="Recherche..."
                                    name="search"
                                    value={search}
                                    // onChange={e => setSearch(e.target.value)}
                                    onChange={handleSearchChange}
                                />
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2 mb-md-0">
                            <button
                                className="btn sort-btn w-100"
                                type="button"
                                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                            >
                                <i className={`bi ${sortOrder === "desc" ? "bi-sort-down" : "bi-sort-up"}`}></i>
                                {sortOrder === "desc" ? " Plus récent" : " Plus ancien"}
                            </button>
                        </div>
                    </div>

                    {/* Loader */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center py-5">
                            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Liste des articles */}
                            <div className="row">
                                {paginatedArticles.map((article: any) => (
                                    <div key={article.id} className="col-12 d-flex mb-4">
                                        <ArticleCard article={article} />
                                    </div>
                                ))}
                                {paginatedArticles.length === 0 && !error && (
                                    <div className="text-center text-muted py-5">
                                        Aucun article trouvé.
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-center align-items-center my-4 gap-2">
                                <button
                                    className="btn search-btn"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Précédent
                                </button>
                                <span>
                                    Page {currentPage} / {totalPages || 1}
                                </span>
                                <button
                                    className="btn search-btn"
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Suivant
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Sidebar chat */}
                <Chatbot   />
            </div>
        </main>
    );
}