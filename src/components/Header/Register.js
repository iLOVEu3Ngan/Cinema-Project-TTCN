import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";
import { actRegisterUserRequest } from "./../../actions/action";

class Register extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
      txtName: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtPhone: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtGender: "Nam",
      txtBirth: "",
      txtEmail: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtPassword: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtRePassword: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtAddress: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
    };
  }
  handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...this.state[name] }; /* dummy object */
    newState.value = value;
    this.setState({ [name]: newState });
  };

  handleInputValidation = (event) => {
    const { name } = event.target;
    const { isInputValid, errorMessage } = validateInput(
      name,
      this.state[name].value,
      this.state.txtPassword.value
    );
    const newState = { ...this.state[name] }; /* dummy object */
    newState.isInputValid = isInputValid;
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  handleChangeGender = (event) => {
    this.setState({
      txtGender: event.target.value,
    });
  };

  handleChangeBirth = (event) => {
    this.setState({
      txtBirth: event.target.value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    let {
      txtName,
      txtPhone,
      txtGender,
      txtPassword,
      txtRePassword,
      txtEmail,
      txtAddress,
      txtBirth,
    } = this.state;

    if (
      txtName.value !== "" &&
      txtName.isInputValid === true &&
      txtPhone.value !== "" &&
      txtPhone.isInputValid === true &&
      txtPassword.value !== "" &&
      txtPassword.isInputValid === true &&
      txtRePassword.value !== "" &&
      txtRePassword.isInputValid === true &&
      txtEmail.value !== "" &&
      txtEmail.isInputValid === true &&
      txtAddress.value !== "" &&
      txtAddress.isInputValid === true
    ) {
      let user = {
        userName: txtName.value,
        email: txtEmail.value,
        phone: txtPhone.value,
        gender: txtGender,
        birth: txtBirth,
        password: txtPassword.value,
        address: txtAddress.value,
        currentStar: 0,
        targets: 0,
      };

      actRegisterUserRequest(user).then((res) => {
        let notification = res.data;

        if (!notification.success) {
          alert(notification.message);
        } else {
          this.setState({ show: false });
          alert(notification.message);
        }
      });
    } else {
      alert("Vui Lòng điền đầy đủ thông tin và đúng định dạng");
    }
  };

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() {
    let toolbar = {
      display: "content",
    };
    let header = {
      color: "#f26b38",
      borderBottom: "2px solid #f26b38",
    };
    let modalHeader = {
      borderBottom: "none",
    };
    let text = {
      color: "#f26b38",
      fontSize: "14px",
    };
    let Buttonn = {
      backgroundColor: "#f26b38",
      border: "1px solid #f26b38",
    };
    let link = {
      display: "inline",
      fontSize: "14px",
      color: "#a0a3a7",
      cursor: "pointer",
    };

    let {
      txtName,
      txtPhone,
      txtGender,
      txtPassword,
      txtRePassword,
      txtEmail,
      txtAddress,
      txtBirth,
    } = this.state;
    return (
      <ButtonToolbar style={toolbar}>
        <div
          style={link}
          onClick={this.handleShow}
          className="text-secondary text-decoration-none"
        >
          Đăng Ký
        </div>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton style={modalHeader}>
            <Modal.Title id="contained-modal-title-lg" style={header}>
              ĐĂNG KÝ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSave} id="nameform">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={txtName.value}
                    placeholder="Họ Tên"
                    name="txtName"
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="txtName"
                    isHidden={this.state.txtName.isInputValid}
                    errorMessage={this.state.txtName.errorMessage}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Số điện thoại"
                    name="txtPhone"
                    value={txtPhone.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="txtPhone"
                    isHidden={this.state.txtPhone.isInputValid}
                    errorMessage={this.state.txtPhone.errorMessage}
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="txtGender"
                      value={txtGender.value}
                      onChange={this.handleChangeGender}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Nam">Nam </option>
                      <option value="Nữ">Nữ </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="txtEmail"
                    value={txtEmail.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="txtEmail"
                    isHidden={this.state.txtEmail.isInputValid}
                    errorMessage={this.state.txtEmail.errorMessage}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu"
                    name="txtPassword"
                    value={txtPassword.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="txtPassword"
                    isHidden={this.state.txtPassword.isInputValid}
                    errorMessage={this.state.txtPassword.errorMessage}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="rePassword"
                    placeholder="Xác nhận mật khẩu"
                    name="txtRePassword"
                    value={txtRePassword.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="txtRePassword"
                    isHidden={this.state.txtRePassword.isInputValid}
                    errorMessage={this.state.txtRePassword.errorMessage}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Địa chỉ"
                    name="txtAddress"
                    value={txtAddress.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="txtAddress"
                    isHidden={this.state.txtAddress.isInputValid}
                    errorMessage={this.state.txtAddress.errorMessage}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    name="txtBirth"
                    value={txtBirth}
                    onChange={this.handleChangeBirth}
                    type="date"
                    id="dayOfBirth"
                    max="3000-12-31"
                    min="1000-01-01"
                    className="form-control"
                    placeholder="Ngày sinh"
                    required
                  />
                </div>
              </div>
              <div className="row text-center mt-3">
                <div className="col-md-12">
                  <p>
                    Tôi đã đọc và đồng ý với{" "}
                    <span style={text}> CHÍNH SÁCH </span> của chương trình.
                  </p>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="nameform" style={Buttonn}>
              Đăng Ký
            </Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

const validateInput = (type, checkingText, pass) => {
  if (type === "txtName") {
    const regexp = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Không chứa số và kí tự đặc biệt.",
      };
    }
  }
  if (type === "txtPhone") {
    const regexp = /^\d{10,11}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "SĐT phải có 10 - 11 chữ số.",
      };
    }
  }
  if (type === "txtEmail") {
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Email không hợp lệ.",
      };
    }
  }
  if (type === "txtPassword") {
    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Mật khẩu từ 8 kí tự bao gồm chữ và số",
      };
    }
  }
  if (type === "txtRePassword") {
    let rePass = checkingText;
    if (pass === rePass) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Mật khẩu không khớp",
      };
    }
  }
  if (type === "txtAddress") {
    if (checkingText !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Vui lòng nhập",
      };
    }
  }
};

function FormError(props) {
  /* nếu isHidden = true, return null ngay từ đầu */
  let color = {
    color: "red",
  };

  if (props.isHidden) {
    return null;
  }

  return (
    <div className="m-1" style={color}>
      {props.errorMessage}
    </div>
  );
}

export default Register;
