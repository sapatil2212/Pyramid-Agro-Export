"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToggleLoader } from "@/components/ui/loading-spinner";
import { Edit, Trash2, Power, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroSlide {
  id: string;
  imageUrl: string;
  altText?: string;
  title?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
}

interface HeroSlideCardProps {
  slide: HeroSlide;
  index: number;
  total: number;
  toggling: boolean;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function HeroSlideCard({ slide, index, total, toggling, onEdit, onToggle, onDelete, onMoveUp, onMoveDown }: HeroSlideCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${!slide.isActive ? 'opacity-60' : ''}`}>
      <div className="flex items-stretch">
        {/* Reorder Controls */}
        <div className="flex flex-col justify-center gap-1 px-2 bg-gray-50 border-r">
          <button onClick={onMoveUp} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 hover:bg-gray-200 rounded" title="Move up">
            <ChevronUp className="h-4 w-4" />
          </button>
          <span className="text-[10px] md:text-xs font-bold text-gray-500 text-center">{index + 1}</span>
          <button onClick={onMoveDown} disabled={index === total - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 hover:bg-gray-200 rounded" title="Move down">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="relative w-36 h-24 flex-shrink-0 bg-gray-100">
          <Image src={slide.imageUrl} alt={slide.altText || 'Hero'} fill className="object-cover" />
          <div className="absolute top-1 right-1">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${slide.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
              {slide.isActive ? 'Active' : 'Off'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-2 md:p-3 min-w-0">
          <div className="flex items-start justify-between gap-2 md:gap-3">
            <div className="min-w-0 flex-1">
              <h5 className="text-xs md:text-sm font-semibold text-gray-900 truncate">{slide.title || 'Untitled'}</h5>
              <p className="text-[10px] md:text-xs text-gray-500 truncate">{slide.subtitle || 'No subtitle'}</p>
              <p className="text-[9px] md:text-[10px] text-gray-400 mt-1 truncate">Alt: {slide.altText || 'Not set'}</p>
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <button onClick={onEdit} className="p-1 md:p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Edit">
                <Edit className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
              <button onClick={onToggle} disabled={toggling}
                className={`p-1 md:p-1.5 rounded-lg ${slide.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title={slide.isActive ? 'Disable' : 'Enable'}>
                {toggling ? <ToggleLoader size="sm" /> : <Power className="h-3.5 w-3.5 md:h-4 md:w-4" />}
              </button>
              <button onClick={onDelete} className="p-1 md:p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
