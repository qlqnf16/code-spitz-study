// 1. Strategy Pattern (class)

const Github = class {
  constructor(id, repo) {
    this._base = "";
  }
  load(path) {
    console.log("common part");
    this._parserClass.parse(path);
    console.log("------------------");
  }
  setParser(v) {
    this._parserClass = v;
  }
};

const Parser = class {
  parse(path) {
    throw new Error("override");
  }
};

const ImageLoader = class extends Parser {
  parse(path) {
    console.log("image loader", path);
  }
};

const MdLoader = class extends Parser {
  parse(path) {
    console.log("md loader", path);
  }
};

const loader = new Github("", "");

const img = new ImageLoader("");
loader.setParser(img);
loader.load("xx.png");

const md = new MdLoader("");
loader.setParser(md);
loader.load("..md");


// 2. 2단 router

const Loader = class {
  constructor() {
    this._router = new Map();
  }
  addRepo(name, id, repo) {
    this._git = new Github(id, repo);
    this._router.set(name, new Map());
  }
  addRouter(name, ext, f, ...arg) {
    ext.split(",").forEach((v) => this._router.get(name).set(v, [f, ...arg]));
  }

  load(name, v) {
    if (!this._router.has(name)) return;
    this._v = v;
    const ext = this._v.split(".").pop();
    if (!this._router.get(name).has(ext)) return;
    this._git.setParser(...this._router.get(name).get(ext));
    this._git.load(v);
  }
};

const loader2 = new Loader();
loader2.addRepo("s74", "id", "repo1");
loader2.addRouter("s74", "jpg,png,gif", img, "#a");
loader2.addRouter("s74", "md", md, "#b");

loader2.addRepo("s79", "id", "repo2");
loader2.addRouter("s79", "jpg,png,gif", img, "#c");
loader2.addRouter("s79", "md", md, "#d");

loader2.load("s74", "xx.jpg");
loader2.load("s79", "xx.md");
