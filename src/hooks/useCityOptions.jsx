import React from 'react';

const useCityOptions = (warehouseData) => {
    const cities = warehouseData.map(w => w.city);
    return [...new Set(cities)];
};

export default useCityOptions;