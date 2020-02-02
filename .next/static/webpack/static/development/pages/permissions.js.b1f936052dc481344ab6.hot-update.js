webpackHotUpdate("static/development/pages/permissions.js",{

/***/ "./components/Permissions.js":
/*!***********************************!*\
  !*** ./components/Permissions.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorMessage */ "./components/ErrorMessage.js");
/* harmony import */ var _styles_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/Table */ "./components/styles/Table.js");
/* harmony import */ var _styles_SickButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/SickButton */ "./components/styles/SickButton.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Users/nimisoeretekena-lawson/Documents/Advanced-React/sick-fits/frontend/components/Permissions.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    query ALL_USERS_QUERY {\n        users {\n            id\n            name\n            email\n            permissions\n        }\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    mutation UPDATE_PERMISSIONS_MUTATION($userId: ID!, $permissions: [Permission]){\n        updatePermissions(permissions: $permissions, userId: $userId){\n            id\n            permissions\n            name\n            email\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];
var UPDATE_PERMISSIONS_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject());
var ALL_USERS_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject2());

var Permissions = function Permissions() {
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_0__["Query"], {
    query: ALL_USERS_QUERY,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, function (_ref) {
    var data = _ref.data,
        loading = _ref.loading,
        error = _ref.error;
    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_ErrorMessage__WEBPACK_IMPORTED_MODULE_3__["default"], {
      error: error,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }, "Manage Permissions"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_Table__WEBPACK_IMPORTED_MODULE_4__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("thead", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tr", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("th", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, "Name"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("th", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, "Email"), possiblePermissions.map(function (permission, index) {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("th", {
        key: index,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, permission);
    }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("th", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tbody", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, data.users.map(function (user) {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(UserPermissions, {
        key: user.id,
        user: user,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      });
    })))));
  });
};



var UserPermissions =
/*#__PURE__*/
function (_Component) {
  _inherits(UserPermissions, _Component);

  function UserPermissions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UserPermissions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UserPermissions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      permissions: _this.props.user.permissions
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePermissionChange", function (e, updatePermissions) {
      var _e$target = e.target,
          value = _e$target.value,
          checked = _e$target.checked;
      var updatedPermissions = _this.state.permissions;

      if (checked) {
        updatedPermissions.push(value);
      } else {
        updatedPermissions = updatedPermissions.filter(function (permission) {
          return permission !== value;
        });
      }

      _this.setState({
        permissions: updatedPermissions
      }, function () {
        return updatePermissions();
      });
    });

    return _this;
  }

  _createClass(UserPermissions, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var user = this.props.user;
      var permissions = this.state.permissions;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_0__["Mutation"], {
        mutation: UPDATE_PERMISSIONS_MUTATION,
        variables: {
          permissions: permissions,
          userId: user.id
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, function (updatePermissions, _ref2) {
        var loading = _ref2.loading,
            error = _ref2.error;
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, error && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tr", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("td", {
          colSpan: 3 + possiblePermissions.length,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_ErrorMessage__WEBPACK_IMPORTED_MODULE_3__["default"], {
          error: error,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("tr", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 111
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 112
          },
          __self: this
        }, user.name), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          },
          __self: this
        }, user.email), possiblePermissions.map(function (permission, index) {
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("td", {
            key: index,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 115
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
            htmlFor: "".concat(user.id, "-permission-").concat(permission),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 116
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
            type: "checkbox",
            id: "".concat(user.id, "-permission-").concat(permission),
            onChange: function onChange(e) {
              return _this2.handlePermissionChange(e, updatePermissions);
            },
            checked: permissions.includes(permission),
            value: permission,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 117
            },
            __self: this
          })));
        }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 121
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_styles_SickButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
          onClick: updatePermissions,
          type: "button",
          disabled: loading,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 122
          },
          __self: this
        }, "Updat", loading ? 'ing' : 'e'))));
      });
    }
  }]);

  return UserPermissions;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_defineProperty(UserPermissions, "propTypes", {
  user: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    email: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    id: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    permissions: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Permissions);

/***/ })

})
//# sourceMappingURL=permissions.js.b1f936052dc481344ab6.hot-update.js.map