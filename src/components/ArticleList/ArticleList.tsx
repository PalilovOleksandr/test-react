import type { Article } from "../../types";


interface ArticleListProps {
    items: Article[];
}

export default function ArticleList({ items }: ArticleListProps) {
    return (
        <ol>
            {items.map(({ objectID, url, title }) => (
                <li key={objectID}>
                    <a href={url} target='_blank' rel="noreferrer noopener">{title}</a>
                </li>
            ))}
        </ol>
    )
}