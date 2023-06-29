import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ModalDelete from "../../../common/ModalDelete";
import http_common from "../../../../http_common";
import { ICategoryItem } from "./types";

const CategoryListPage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    http_common.get<ICategoryItem[]>("api/category").then((resp) => {
      console.log("Categories", resp.data);
      setList(resp.data);
    });
  }, []);

  const onClickDelete = async (id: number) => {
    try {
      await http_common.delete(`api/category/${id}`);
      setList(list.filter((x) => x.id !== id));
    } catch {
      console.log("Помилка видалення");
    }
  };

  return (
    <>
      <div className="container">
        <Typography variant="h1" align="center" gutterBottom>
          Список категорій
        </Typography>
        <Link to="create">
          <Button variant="contained" color="success">Додати</Button>
        </Link>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Назва</TableCell>
                <TableCell>Фото</TableCell>
                <TableCell>Опис</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.image}</TableCell>
                  <TableCell>{c.description}</TableCell>
                  <TableCell>
                    <ModalDelete id={c.id} text={c.name} deleteFunc={onClickDelete} />
                    &nbsp; &nbsp;
                    <Link to={`edit/${c.id}`} className="btn btn-info">
                      Змінити
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CategoryListPage;