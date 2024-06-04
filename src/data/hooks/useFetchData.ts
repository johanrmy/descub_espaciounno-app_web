import { useState, useEffect } from 'react';

interface TableConfig<T> {
    data: T[];
    itemsPerPage: number;
}

export const useTableData = <T,>(tableConfig: TableConfig<T>) => {
    const { data, itemsPerPage } = tableConfig;
    const [currentItems, setCurrentItems] = useState<T[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data, itemOffset, itemsPerPage]);

    const handlePageClick = (event: any) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    return { currentItems, setCurrentItems, pageCount, handlePageClick };
};
