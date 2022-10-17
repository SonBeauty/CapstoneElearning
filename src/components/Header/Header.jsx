import axiosCilent from "apis/axiosClient";
import coursesAPI from "apis/coursesAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const {
    data: listCourses,
    isLoading,
    error,
  } = useRequest(() => coursesAPI.getListCourses());

  if (!listCourses) {
    return null;
  }

  console.log(listCourses);

  return (
    <>
      <h1>Header</h1>
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
