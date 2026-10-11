import { createElement, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import { cn } from '../../lib/utils';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'outline' | 'icon' | 'filter';
  size?: 'default' | 'small';
  active?: boolean;
};

/** Source native buttons/anchors, with source variants and data attributes. */
export function Button({href,variant='primary',size='default',active=false,className,children,disabled,onClick,type='button',...props}:ButtonProps) {
  const classes=variant==='icon'?'mj-icon-button':variant==='filter'?cn('mj-filter',active && 'is-active'):cn('mj-button',variant==='primary'?'mj-primary':'mj-outline',size==='small' && 'mj-small');
  return createElement(href?'a':'button',{
    ...props,
    className:cn(classes,className),
    ...(href?{href,target:props.target,rel:props.rel,'aria-disabled':disabled || undefined,tabIndex:disabled?-1:props.tabIndex}:{type,disabled}),
    ...(variant==='filter'?{'aria-pressed':active}:{}),
    onClick:(event:MouseEvent<HTMLButtonElement>)=>{if(disabled){event.preventDefault();return;}onClick?.(event);},
  },children);
}
