import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import http_common from "../../../../http_common";
import { ICategoryItem } from "../list/types";
import defaultImage from "../../../../assets/default.jpg";
import { APP_ENV } from "../../../../env";

interface ICategoryEdit {
  id: number;
  name: string;
  image: File | null;
  description: string;
}

const CategoryEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [oldImage, setOldImage] = useState<string>("");

  const init: ICategoryEdit = {
    id: id ? Number(id) : 0,
    name: "",
    image: null,
    description: "",
  };

  const onFormikSubmit = async (values: ICategoryEdit) => {
    try {
      const formData = new FormData();
      formData.append("id", String(values.id));
      formData.append("name", values.name);
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("description", values.description);

      await http_common.post(`api/category/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("../..");
    } catch {
      console.log("Server error");
    }
  };

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    http_common.get<ICategoryItem>(`api/category/${id}`).then((resp) => {
      const { data } = resp;
      setFieldValue("name", data.name);
      setOldImage(`${APP_ENV.BASE_URL}/uploads/300_${data.image}`);
      setFieldValue("description", data.description);
    });
  }, [id]);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          alert("Не допустимий тип файлу");
          return;
        }
        setFieldValue(e.target.name, file);
      }
    }
  };

  const imgView = oldImage ? oldImage : defaultImage;

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>
        Змінити категорію
      </Typography>
      <div className="container">
        <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
          <TextField
            label="Назва"
            fullWidth
            value={values.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            variant="outlined"
          />

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              <img
                src={values.image === null ? imgView : URL.createObjectURL(values.image)}
                alt="фото"
                width={200}
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              className="form-control d-none"
              id="image"
              onChange={onChangeFileHandler}
              name="image"
            />
          </div>

          <TextField
            label="Опис"
            fullWidth
            value={values.description}
            onChange={handleChange}
            name="description"
            margin="normal"
            variant="outlined"
          />

          <Button type="submit" variant="contained" color="primary">
            Зберегти
          </Button>
        </form>
      </div>
    </>
  );
};

export default CategoryEditPage;