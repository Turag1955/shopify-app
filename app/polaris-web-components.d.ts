import React from 'react';

import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            's-page': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { title?: string };
            's-card': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            's-stack': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { gap?: string; direction?: 'inline' | 'block'; align?: string; justify?: string; justifyContent?: string; wrap?: boolean };
            's-heading': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { 'accessibility-role'?: string; 'accessibility-level'?: number };
            's-paragraph': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            's-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { variant?: string; tone?: string; size?: string; icon?: string; loading?: boolean; disabled?: boolean; 'accessibility-label'?: string; accessibilityLabel?: string; onClick?: () => void; href?: string };
            's-layout': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            's-layout-section': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { variant?: 'one-half' | 'one-third' };
            's-block-stack': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { gap?: string }; // Keeping this just in case, but likely s-stack
            's-list': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { type?: 'bullet' | 'number' };
            's-list-item': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            's-grid': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { gridTemplateColumns?: string; alignItems?: string; gap?: string };
            's-thumbnail': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { size?: string; src?: string; alt?: string };
            's-box': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            's-clickable': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
