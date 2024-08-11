import { describe, it, vi, expect, beforeEach } from 'vitest';
import { on, off } from '../event';

describe('Event', () => {
  let target: HTMLElement;
  let callback: EventListener;

  beforeEach(() => {
    target = document.createElement('div');
    callback = vi.fn();
  });

  describe('on', () => {
    it('should call addEventListener with the correct arguments', () => {
      const addEventListenerSpy = vi.spyOn(target, 'addEventListener');
      on(target, 'click', callback);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'click',
        callback,
        undefined,
      );
    });

    it('should handle options parameter correctly', () => {
      const addEventListenerSpy = vi.spyOn(target, 'addEventListener');
      const options = { capture: true };
      on(target, 'click', callback, options);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'click',
        callback,
        options,
      );
    });

    it('should not call addEventListener if target is null', () => {
      const addEventListenerSpy = vi.spyOn(target, 'addEventListener');
      on(null as unknown as HTMLElement, 'click', callback);

      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('off', () => {
    it('should call removeEventListener with the correct arguments', () => {
      const removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');
      off(target, 'click', callback);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'click',
        callback,
        undefined,
      );
    });

    it('should handle options parameter correctly', () => {
      const removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');
      const options = { capture: true };
      off(target, 'click', callback, options);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'click',
        callback,
        options,
      );
    });

    it('should not call removeEventListener if target is null', () => {
      const removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');
      off(null as unknown as HTMLElement, 'click', callback);

      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });
});
