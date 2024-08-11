import { fireEvent, renderHook } from "@testing-library/react";
import { useEventListener } from "../useEventListener";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("useEventListener", () => {
  const ref = { current: document.createElement("div") };
  const windowAddEventListenerSpy = vi.spyOn(window, "addEventListener");
  const windowRemoveEventListenerSpy = vi.spyOn(window, "removeEventListener");

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should bind/unbind the event listener to the window when element is not provided", () => {
    const eventName = "click";
    const handler = vi.fn();
    const options = undefined;

    const { unmount } = renderHook(() => {
      useEventListener(eventName, handler);
    });

    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      options
    );

    unmount();

    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      options
    );
  });

  it("should call the event listener handler when the event is triggered", () => {
    const eventName = "click";
    const handler = vi.fn();

    renderHook(() => {
      useEventListener(eventName, handler, ref);
    });

    fireEvent.click(ref.current);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should have the correct event type", () => {
    const clickHandler = vi.fn();
    const keydownHandler = vi.fn();

    renderHook(() => {
      useEventListener("click", clickHandler, ref);
    });
    renderHook(() => {
      useEventListener("keydown", keydownHandler, ref);
    });

    fireEvent.click(ref.current);
    fireEvent.keyDown(ref.current);

    expect(clickHandler).toHaveBeenCalledWith(expect.any(MouseEvent));
    expect(keydownHandler).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });
});
