import { useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { Upload, X, File } from 'lucide-react';

/**
 * File Upload component with glassmorphic styling
 *
 * @param {Object} props
 * @param {string} props.label - Upload label
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.multiple - Allow multiple files
 * @param {string} props.accept - Accepted file types
 * @param {number} props.maxSize - Max file size in bytes
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional classes
 */
const FileUpload = ({
  label,
  onChange,
  multiple = false,
  accept,
  maxSize,
  disabled = false,
  className,
}) => {
  const { isDark } = useTheme();
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const bgColor = isDark
    ? 'bg-[rgba(146,151,179,0.13)]'
    : 'bg-[rgba(255,255,255,0.7)]';
  const borderColor = isDark
    ? 'border-[rgba(249,250,251,0.3)]'
    : 'border-[rgba(0,0,0,0.2)]';
  const hoverBg = isDark
    ? 'hover:bg-[rgba(146,151,179,0.2)]'
    : 'hover:bg-[rgba(0,0,0,0.05)]';
  const dragActiveBg = isDark
    ? 'bg-primary/15'
    : 'bg-primary/10';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const filesArray = Array.from(fileList);

    // Filter by max size if specified
    const validFiles = maxSize
      ? filesArray.filter((file) => file.size <= maxSize)
      : filesArray;

    setFiles(multiple ? validFiles : [validFiles[0]]);
    onChange && onChange(multiple ? validFiles : validFiles[0]);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange && onChange(multiple ? newFiles : null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className={cn('block text-[15px] font-medium', textColor)}>
          {label}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-[14px] p-8 text-center transition-all ease-[0.3s] cursor-pointer backdrop-blur-[20px]',
          bgColor,
          borderColor,
          !disabled && hoverBg,
          dragActive && dragActiveBg,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <Upload className={cn('w-10 h-10', mutedColor)} />
          <div>
            <p className={cn('text-[15px] font-medium mb-1', textColor)}>
              {dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className={cn('text-[13px]', mutedColor)}>
              {accept || 'All file types'} {maxSize && `(Max ${formatFileSize(maxSize)})`}
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-between p-3 rounded-[14px] backdrop-blur-[20px]',
                bgColor,
                borderColor,
                'border'
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <File className={cn('w-5 h-5 flex-shrink-0', mutedColor)} />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-[14px] font-medium truncate', textColor)}>
                    {file.name}
                  </p>
                  <p className={cn('text-[12px]', mutedColor)}>
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              {!disabled && (
                <button
                  onClick={() => removeFile(index)}
                  className={cn(
                    'p-1 rounded-lg transition-all ease-[0.3s] hover:bg-danger/10',
                    'text-danger'
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
