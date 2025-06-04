import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { clsx } from 'clsx';

import { useTheme } from '~/domains/global/entities/theme';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
  height?: number;
  preview?: 'live' | 'edit' | 'preview';
  hideToolbar?: boolean;
  visibleDragBar?: boolean;
  className?: string;
  data?: object;
}

export const MarkdownEditor = ({
  ref,
  value,
  onChange,
  height = 400,
  preview = 'live',
  hideToolbar = false,
  visibleDragBar = true,
  className,
  data,
}: MarkdownEditorProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const { resolvedTheme } = useTheme();
  const [internalValue, setInternalValue] = useState<string | undefined>(value);

  const handleChange = (val?: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'markdown-editor-wrapper',

        className,
      )}
      data-color-mode='auto'
      {...data}
    >
      <MDEditor
        value={internalValue}
        onChange={handleChange}
        height={height}
        preview={preview}
        hideToolbar={hideToolbar}
        visibleDragbar={visibleDragBar}
        data-color-mode={resolvedTheme}
      />
    </div>
  );
};

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
