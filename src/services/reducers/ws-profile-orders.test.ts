import { describe, expect, it } from "vitest";
import {
  ProfileOrdersReducer,
  wsProfileInitialState as initialState,
  ProfileOrdersStore,
} from "./ws-profile-orders";
import { wsClose, wsConnecting, wsError, wsOpen } from "../actions/ws-feed";
import { wsProfileOrders } from "../actions/ws-profile-orders";
import { WebsocketStatus } from "../../utils/types";

describe("ProfileOrdersReducer", () => {
  it("should return the initial state", () => {
    expect(ProfileOrdersReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle wsConnecting", () => {
    const action = wsConnecting();
    const expectedState: ProfileOrdersStore = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    };
    expect(ProfileOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsOpen", () => {
    const action = wsOpen();
    const expectedState: ProfileOrdersStore = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: "",
    };
    expect(ProfileOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsError", () => {
    const action = wsError("Test error");
    const expectedState: ProfileOrdersStore = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
      error: "Test error",
    };
    expect(ProfileOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsClose", () => {
    const action = wsClose("1000");
    const expectedState: ProfileOrdersStore = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    };
    expect(ProfileOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsProfileOrders", () => {
    const action = wsProfileOrders({
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
        {
          ingredients: ["ingredient3", "ingredient4"],
          _id: "456",
          owner: "user1",
          status: "pending",
          name: "Order 2",
          createdAt: "2023-10-27T10:00:00.000Z",
          updatedAt: "2023-10-27T10:00:00.000Z",
          number: 2,
        },
      ],
      total: 10,
      totalToday: 5,
    });
    const expectedState: ProfileOrdersStore = {
      ...initialState,
      orders: [
        {
          ingredients: ["ingredient3", "ingredient4"],
          _id: "456",
          owner: "user1",
          status: "Готовится",
          name: "Order 2",
          createdAt: "2023-10-27T10:00:00.000Z",
          updatedAt: "2023-10-27T10:00:00.000Z",
          number: 2,
        },
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
    expect(ProfileOrdersReducer(initialState, action)).toEqual(expectedState);
  });
});
