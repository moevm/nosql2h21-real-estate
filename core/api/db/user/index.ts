import myaxios from "core/api/axios";
import {
  UserCreateResponseData,
  UserCreateResquestData,
  UserReadResquestData,
  UserReadResponseData,
  UserUpdateResquestData,
  UserUpdateResponseData,
  UserListResquestData,
  UserListResponseData,
} from "core/types/api";

function create(data: UserCreateResquestData) {
  return myaxios.post<UserCreateResponseData>(`/users`, data);
}
function read(data: UserReadResquestData) {
  return myaxios.get<UserReadResponseData>(`/users`, data);
}
function update(data: UserUpdateResquestData) {
  return myaxios.put<UserUpdateResponseData>(`/users`, data);
}
function list(data: UserListResquestData) {
  return myaxios.get<UserListResponseData>(`/users`, data);
}
const userApi = { create, read, update, list };

export default userApi;
