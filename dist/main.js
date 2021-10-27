/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst cors = __webpack_require__(/*! cors */ \"cors\");\r\nconst app = express();\r\nconst models = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './models'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst multer = __webpack_require__(/*! multer */ \"multer\");\r\nconst upload = multer({\r\n  storage: multer.diskStorage({\r\n    destination: function (req, file, cb) {\r\n      cb(null, \"uploads/\");\r\n    },\r\n    filename: function (req, file, cb) {\r\n      cb(null, file.originalname);\r\n    },\r\n  }),\r\n});\r\nconst port = process.env.PORT || 8080;\r\n\r\napp.use(express.json());\r\napp.use(cors());\r\napp.use(\"/uploads\", express.static(\"uploads\"));\r\n\r\napp.get(\"/banners\", (req, res) => {\r\n  models.Banner.findAll({\r\n    limit: 2,\r\n  })\r\n    .then((result) => {\r\n      res.send({\r\n        banners: result,\r\n      });\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n      res.status(500).send(\"에러가 발생하였습니다.\");\r\n    });\r\n});\r\n\r\napp.get(\"/products\", (req, res) => {\r\n  models.Product.findAll({\r\n    order: [[\"createdAt\", \"DESC\"]],\r\n    attributes: [\r\n      \"id\",\r\n      \"name\",\r\n      \"price\",\r\n      \"imageUrl\",\r\n      \"createdAt\",\r\n      \"seller\",\r\n      \"soldout\",\r\n    ],\r\n  })\r\n    .then((result) => {\r\n      console.log(\"PRODUCTS: \", result);\r\n      res.send({\r\n        products: result,\r\n      });\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n      res.status(400).send(\"에러 발생\");\r\n    });\r\n});\r\n\r\napp.post(\"/products\", (req, res) => {\r\n  const body = req.body;\r\n  const { name, description, price, seller, imageUrl } = body;\r\n  if (!name || !description || !price || !seller || !imageUrl) {\r\n    res.status(400).send(\"모든 정보를 입력해주세요.\");\r\n  }\r\n  models.Product.create({\r\n    name,\r\n    description,\r\n    price,\r\n    seller,\r\n    imageUrl,\r\n  })\r\n    .then((result) => {\r\n      console.log(\"상품 생성 결과: \", result);\r\n      res.send({\r\n        result,\r\n      });\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n      res.status(400).send(\"상품 업로드에 문제가 발생했습니다\");\r\n    });\r\n});\r\n\r\napp.get(\"/products/:id\", (req, res) => {\r\n  const params = req.params;\r\n  const { id } = params;\r\n  models.Product.findOne({\r\n    where: {\r\n      id: id,\r\n    },\r\n  })\r\n    .then((result) => {\r\n      console.log(\"PRODUCT:\", result);\r\n      res.send({\r\n        product: result,\r\n      });\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n      res.status(400).send(\"상품 조회에 에러가 발생하였습니다.\");\r\n    });\r\n});\r\n\r\napp.post(\"/image\", upload.single(\"image\"), (req, res) => {\r\n  const file = req.file;\r\n  console.log(file);\r\n  res.send({\r\n    imageUrl: file.path,\r\n  });\r\n});\r\n\r\napp.post(\"/purchase/:id\", (req, res) => {\r\n  const { id } = req.params;\r\n  models.Product.update(\r\n    {\r\n      soldout: 1,\r\n    },\r\n    {\r\n      where: {\r\n        id,\r\n      },\r\n    }\r\n  )\r\n    .then((result) => {\r\n      res.send({\r\n        result: true,\r\n      });\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n      res.status(500).send(\"에러가 발생했습니다.\");\r\n    });\r\n});\r\n\r\napp.listen(port, () => {\r\n  console.log(\"유파이브의 쇼핑몰 서버가 돌아가고 있습니다.\");\r\n  models.sequelize\r\n    .sync()\r\n    .then(() => {\r\n      console.log(\"DB 연결 성공!\");\r\n    })\r\n    .catch((err) => {\r\n      console.log(\"DB 연결 에러ㅠㅠ\");\r\n      process.exit();\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ })

/******/ });