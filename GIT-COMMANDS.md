# أوامر Git للرفع إلى GitHub

## بعد إنشاء Repository على GitHub، نفذ هذه الأوامر:

```bash
# استبدل USERNAME باسم مستخدم GitHub الخاص بك
git remote add origin https://github.com/USERNAME/aqua-control-website.git

# رفع الملفات إلى GitHub
git branch -M main
git push -u origin main
```

## مثال:
إذا كان اسم المستخدم الخاص بك "aquacontrol123"، فالأمر سيكون:
```bash
git remote add origin https://github.com/aquacontrol123/aqua-control-website.git
```

## تفعيل GitHub Pages:
1. اذهب إلى Repository على GitHub
2. اضغط على "Settings"
3. انتقل إلى "Pages" من القائمة الجانبية
4. في "Source" اختر "Deploy from a branch"
5. اختر "main" branch
6. اضغط "Save"

## الرابط النهائي:
بعد التفعيل، الموقع سيكون متاح على:
`https://USERNAME.github.io/aqua-control-website/`

---

**ملاحظة مهمة:** استبدل USERNAME باسم مستخدم GitHub الفعلي الخاص بك.
