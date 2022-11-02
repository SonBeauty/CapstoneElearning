import { Button } from "antd";
import axiosCilent from "apis/axiosClient";
import courseAPI from "apis/courseAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {
    data: listCourses,
    isLoading,
    error,
  } = useRequest(() => courseAPI.getListCourses());
  const navigate = useNavigate()

  if (!listCourses) {
    return null;
  }

  console.log(listCourses);

  return (
    <>
      <h1>Header</h1>
      <Button onClick={()=>{navigate(`/admin`)}} type="primary">to admin</Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Danh Sách khóa học
        </Dropdown.Toggle>
        {listCourses.map((courses) => {
          return (
            <>
           
              <Dropdown.Menu>
                <Dropdown.Item>{courses.tenDanhMuc}</Dropdown.Item>
              </Dropdown.Menu>
            </>
          );
        })}
      </Dropdown>
    </>
  );
};

export default Header;
