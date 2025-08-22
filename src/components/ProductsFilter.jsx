'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';

export default function ProductsFilter({ 
  filters, 
  onFiltersChange, 
  totalProducts, 
  isLoading 
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (key) => {
    const defaultValue = key === 'sort' ? 'default' : '';
    const newFilters = { ...localFilters, [key]: defaultValue };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      minPrice: '',
      maxPrice: '',
      sort: 'default'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.entries(localFilters).some(([key, value]) => 
    value && value !== '' && !(key === 'sort' && value === 'default')
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {Object.entries(localFilters).filter(([key, value]) => 
                  value && value !== '' && !(key === 'sort' && value === 'default')
                ).length}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-600">
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>{totalProducts} products found</span>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {localFilters.search && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Search: {localFilters.search}</span>
              <button onClick={() => clearFilter('search')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {localFilters.minPrice && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Min: ${localFilters.minPrice}</span>
              <button onClick={() => clearFilter('minPrice')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {localFilters.maxPrice && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Max: ${localFilters.maxPrice}</span>
              <button onClick={() => clearFilter('maxPrice')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {localFilters.sort && localFilters.sort !== 'default' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Sort: {localFilters.sort}</span>
              <button onClick={() => clearFilter('sort')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Detailed Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price Range */}
              <div className="space-y-2">
                <Label>Min Price</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localFilters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Max Price</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={localFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={localFilters.sort}
                  onValueChange={(value) => handleFilterChange('sort', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
