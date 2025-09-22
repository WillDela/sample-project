'use client';

import React, { useState, useRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md hover:shadow-lg',
    outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800'
  };

  const sizeClasses = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 py-2.5',
    lg: 'h-14 px-8 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      createPreview(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      createPreview(file);
    }
  };

  const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
    }
  }, [selectedFile]);

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          dragOver
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 hover:scale-102'
        } transform`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-80 rounded-xl shadow-2xl border border-gray-200"
              />
              <div className="absolute top-3 right-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileSelect(null as any);
                    setPreview(null);
                  }}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {selectedFile?.name}
              </p>
              <p className="text-sm text-gray-600">
                {Math.round((selectedFile?.size || 0) / 1024)}KB • {selectedFile?.type}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">📸</span>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800 mb-2">
                Drop your image here
              </p>
              <p className="text-lg text-gray-600 mb-1">
                or click to browse your files
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Button;
export { FileUpload };