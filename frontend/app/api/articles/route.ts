// app/api/articles/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").toLowerCase();
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const filePath = path.join(process.cwd(), "articles.json");
  const data = await fs.readFile(filePath, "utf-8");
  let articles = JSON.parse(data);

  // Filtrage plein texte sur titre et contenu
  if (query) {
    articles = articles.filter((article: any) =>
      `${article.title} ${article.content}`.toLowerCase().includes(query)
    );
  }

  // Tri par date
  articles = articles.sort((a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sort === "asc" ? dateA - dateB : dateB - dateA;
  });

  return NextResponse.json(articles);
}




