/**
 * Critères disponibles pour trier les médias.
 */
export type SortCriteria = "popularite" | "date" | "titre";

type MediaSortProps = {
    sortBy: SortCriteria;
    onSortChange: (value: SortCriteria) => void;
};

export default function MediaSort({
    sortBy, onSortChange
}: MediaSortProps) {
    return (
        <div>
            <label htmlFor="media-sort">Trier par :</label>

            <select
                id="media-sort"
                value={sortBy}
                onChange={(event) =>
                    onSortChange(event.target.value as SortCriteria)
                }
            >
                <option value="popularite">Popularité</option>
                <option value="date">Date</option>
                <option value="titre">Titre</option>
            </select>
        </div>
    );
}