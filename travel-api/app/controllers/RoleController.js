const { Sequelize } = require("sequelize");
const express = require("express");
const { Role } = require("../models");

const GetRole = async (req, res) => {
  try {
    const roles = await Role.findAll();

    return res.status(200).send({
      status: 200,
      message: "OK",
      data: roles,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
      errors: err,
    });
  }
};

const CreateRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    const create = await Role.create({
      role_name,
    });

    return res.status(201).send({
      status: 201,
      message: "Created",
      data: create,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
      errors: err,
    });
  }
};

const UpdateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    role.role_name = role_name;

    await role.save();

    return res.status(200).send({
      status: 200,
      message: "OK",
      data: role,
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: err.message,
      errors: err,
    });
  }
};

const DeleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    await role.destroy();

    return res.status(200).send({
      status: 200,
      message: "Deleted",
      data: role,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
      errors: err,
    });
  }
};

const GetRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    return res.status(200).send({
      status: 200,
      message: "OK",
      data: role,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Interval server error",
      errors: err,
    });
  }
};

module.exports = {
  GetRole,
  CreateRole,
  UpdateRole,
  DeleteRole,
  GetRoleById,
};
