import { describe, expect, it } from "vitest";
import {
  FeedReducer,
  WsFeedInitialState as initialState,
  FeedStore,
} from "./ws-feed";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsOpen,
  wsFeed,
} from "../actions/ws-feed";
import { WebsocketStatus } from "../../utils/types";

describe("FeedReducer", () => {
  it("should return the initial state", () => {
    expect(FeedReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle wsConnecting", () => {
    const action = wsConnecting();
    const expectedState: FeedStore = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    };
    expect(FeedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsOpen", () => {
    const action = wsOpen();
    const expectedState: FeedStore = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: "",
    };
    expect(FeedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsError", () => {
    const action = wsError("Test error");
    const expectedState: FeedStore = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
      error: "Test error",
    };
    expect(FeedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsClose", () => {
    const action = wsClose("1000");
    const expectedState: FeedStore = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    };
    expect(FeedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsFeed", () => {
    const action = wsFeed({
      success: true,
      orders: [
        {
          ingredients: ["ingredient1", "ingredient2"],
          _id: "123",
          owner: "user1",
          status: "done",
          name: "Order 1",
          createdAt: "2023-10-26T10:00:00.000Z",
          updatedAt: "2023-10-26T10:00:00.000Z",
          number: 1,
        },
      ],
      total: 10,
      totalToday: 5,
    });
    const expectedState: FeedStore = {
      ...initialState,
      orders: [
        {
          ingredients: ["ingredient1", "ingredient2"],
          _id: "123",
          owner: "user1",
          status: "Выполнен",
          name: "Order 1",
          createdAt: "2023-10-26T10:00:00.000Z",
          updatedAt: "2023-10-26T10:00:00.000Z",
          number: 1,
        },
      ],
      total: 10,
      totalToday: 5,
    };
    expect(FeedReducer(initialState, action)).toEqual(expectedState);
  });
});
