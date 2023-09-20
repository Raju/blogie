import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import FormikControl from "@components/FormikComponent/FormikControl";
import FormikContainer from "@components/FormikComponent/FormikContainer";

const Modal = ({
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  handleAddBlog,
  handleEditBlog,
  isEdit = false,
  setIsEdit,
}) => {
  const handleSubmit = async (values) => {
    isEdit ? handleEditBlog(values) : handleAddBlog(values);
    setIsEdit(false);
    onClose();
  };

  return createPortal(
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur ${isOpen ? "" : "hidden"}`}>
      <div className="relative w-[30%] border border-gray-300 p-5 rounded-lg flex flex-col bg-white">
        <header className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">Add new blog</h3>

          <button
            type="button"
            onClick={() => {
              onClose();
              setIsEdit(false);
            }}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="w-full">
          <FormikContainer
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormikControl type="text" id="title" name="title" placeholder="Enter blog title" />
            <FormikControl
              control="textarea"
              type="text"
              id="description"
              name="description"
              placeholder="Enter blog description"
              rows={2}
            />
            <FormikControl
              control="textarea"
              type="text"
              id="content"
              name="content"
              placeholder="Enter blog content"
              rows={5}
            />
            <FormikControl type="text" id="author" name="author" placeholder="Enter author name" />

            <div className="flex justify-between gap-5 mb-2">
              <button type="submit" className="bg-green-600 text-white rounded-md w-1/2 py-2">
                {isEdit ? "UPDATE" : "CREATE"}
              </button>
              <button
                type="button"
                className="bg-red-600 text-white rounded-md w-1/2 py-2"
                onClick={() => {
                  onClose();
                  setIsEdit(false);
                }}
              >
                CANCEL
              </button>
            </div>
          </FormikContainer>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
