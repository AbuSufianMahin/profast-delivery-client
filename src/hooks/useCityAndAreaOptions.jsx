import React, { useMemo } from 'react';

const useAreaOptions = (warehouseData, selectedCity) => {

    const areaOptions = useMemo(() => {
        if (!selectedCity) return [];

        const cityEntry = warehouseData.find(w => w.city === selectedCity);
        return cityEntry?.covered_area || [];
    }, [warehouseData, selectedCity]);

    return areaOptions;
};

export default useAreaOptions;