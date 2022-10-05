import axiosCilent from "apis/axiosClient";
import coursesAPI from "apis/coursesAPI";
import useRequest from "hooks/useRequest";
import React, { useEffect, useState } from "react";
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
          Dropdown Button
        </Dropdown.Toggle>
        {listCourses.data.map((courses) => {
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
