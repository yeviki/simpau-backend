📌 Cara Menggunakan dalam Routing
Manual Mode (role lama)

Masih bisa:
```
router.get("/", auth, role(null, null, 1, 2, 3), getMenu);
```

Dynamic Mode (dengan module + control)

Seperti:
```
router.post("/", auth, role("menu", "create"), createMenu);
router.put("/:id", auth, role("menu", "update"), updateMenu);
router.delete("/:id", auth, role("menu", "delete"), deleteMenu);
```