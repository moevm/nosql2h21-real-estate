import myaxios from "core/api/axios";
import {
  UserCreateResponseData,
  UserCreateRequestData,
  UserReadRequestData,
  UserReadResponseData,
  UserUpdateRequestData,
  UserUpdateResponseData,
  UserListRequestData,
  UserListResponseData,
} from "core/types/api";

function create(data: UserCreateRequestData) {
  return myaxios.post<UserCreateResponseData>(`/users`, data);
}
function read(data: UserReadRequestData) {
  return myaxios.get<UserReadResponseData>(`/users`, data);
}
function update(data: UserUpdateRequestData) {
  return myaxios.put<UserUpdateResponseData>(`/users`, data);
}
function list(data: UserListRequestData) {
  return myaxios.get<UserListResponseData>(`/users`, data);
}
const userApi = { create, read, update, list };

export default userApi;
