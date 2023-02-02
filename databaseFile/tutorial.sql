-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2023 at 06:48 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutorial`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book`, `link`, `created_at`, `updated_at`) VALUES
(1, 'editor tiptap', 'editor-tiptap', '2022-03-06 04:09:00', '2022-03-06 04:09:00'),
(2, 'laravel', 'laravel', '2022-03-12 04:04:01', '2022-03-12 04:04:01'),
(3, 'laravel api', 'laravel-api', '2022-03-12 04:05:59', '2022-03-12 04:05:59'),
(4, 'json', 'json', '2022-03-13 01:53:51', '2022-03-13 01:53:51'),
(5, 'js', 'js', '2022-03-21 01:03:19', '2022-03-21 01:03:19'),
(6, 'css', 'css', '2022-03-31 02:52:28', '2022-03-31 02:52:28'),
(7, 'نکات آموزشی php c++ js', 'php-cPluc-js', '2022-12-25 02:47:38', '2022-12-25 02:47:38'),
(8, 'c++', 'cPluc', '2023-01-22 02:18:07', '2023-01-22 02:18:07'),
(9, 'php', 'php', '2023-01-22 02:24:30', '2023-01-22 02:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `book_types`
--

CREATE TABLE `book_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_types`
--

INSERT INTO `book_types` (`id`, `book`, `link`, `created_at`, `updated_at`) VALUES
(1, 'tiptap', 'tiptap', '2022-03-06 04:28:15', '2022-03-06 04:28:15'),
(2, 'english.word.448', 'english-word', '2022-03-12 04:14:20', '2022-03-12 04:14:20'),
(3, 'api', 'api', '2022-03-12 06:40:43', '2022-03-12 06:40:43'),
(4, 'json', 'json', '2022-03-13 02:14:22', '2022-03-13 02:14:22'),
(5, 'js', 'js', '2022-03-21 00:46:49', '2022-03-21 00:46:49'),
(6, 'universal', 'universal', '2022-03-23 02:26:16', '2022-03-23 02:26:16'),
(7, 'css', 'css', '2022-03-26 02:36:10', '2022-03-26 02:36:10'),
(8, 'english_new_way', 'english-new-way', '2022-05-04 23:27:28', '2022-05-04 23:27:28'),
(9, 'software', 'software', '2022-05-05 01:24:36', '2022-05-05 01:24:36'),
(10, 'computer idioms', 'computer-idioms', '2022-05-11 00:44:43', '2022-05-11 00:44:43'),
(12, 'mysql', 'mysql', '2022-07-01 23:43:22', '2022-07-01 23:43:22'),
(14, 'charsExercise', 'charsExercise', '2022-08-16 08:18:16', '2022-08-16 08:18:16');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `lesson` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `book_id`, `lesson`, `link`, `created_at`, `updated_at`) VALUES
(1, 1, 'introduction and install', 'install', '2022-03-06 04:12:27', '2022-03-06 04:12:27'),
(2, 1, 'extension table', 'addTable', '2022-03-09 08:58:03', '2022-03-09 08:58:03'),
(4, 4, 'introduction', 'introduction', '2022-03-13 01:58:15', '2022-03-13 01:58:15'),
(5, 4, 'json in php', 'json-php', '2022-03-13 02:08:25', '2022-03-13 02:08:25'),
(6, 4, 'json in js', 'json-in-js', '2022-03-16 00:16:44', '2022-03-16 00:16:44'),
(7, 5, 'prototype', 'prototype', '2022-03-21 01:03:39', '2022-03-21 01:03:39'),
(8, 2, 'اجرای همزمان چند پروژه لاراول', 'run-laravel', '2022-03-31 02:53:24', '2022-03-31 03:08:35'),
(9, 7, 'متغییرها', 'variables', '2022-12-25 02:52:12', '2022-12-25 10:05:27'),
(10, 7, 'آرایه ها', 'arrays', '2022-12-26 04:45:30', '2022-12-26 04:45:30'),
(11, 7, 'pointer', 'pointer', '2023-01-05 13:54:16', '2023-01-05 13:54:16'),
(12, 5, 'array in js', 'array-in-js', '2023-01-22 01:55:33', '2023-01-22 01:55:33'),
(13, 8, 'array in c++', 'array-in-c-plus', '2023-01-22 02:18:43', '2023-01-22 02:18:43'),
(14, 9, 'array in php', 'array-in-php', '2023-01-22 02:24:53', '2023-01-22 02:24:53');

-- --------------------------------------------------------

--
-- Table structure for table `lesson_sections`
--

CREATE TABLE `lesson_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `ordering` tinyint(4) NOT NULL COMMENT 'ترتیب هر بخش',
  `lesson_section` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'هر بخش درس',
  `des` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Description شرح درس',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lesson_sections`
--

INSERT INTO `lesson_sections` (`id`, `lesson_id`, `ordering`, `lesson_section`, `des`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'introduction (معرفی)', '<p dir=\"auto\">ادیتور tiptap یک ادیتور ایجاد متن غنی <code>(rich eidtor) </code>  است که به تازگی وارد عرصه وب شده است و هم اکنون در مرحله تست می‌باشد. ولی به خوبی می‌توان از آن استفاده کرد. از مزایای این ادیتور استفاده رایگان و همچنین توسعه آسان آن می‌باشد. به آسانی می‌توان آن را برای react پیاده سازی کرد </p>', '2022-03-06 04:19:30', '2022-03-06 04:19:30'),
(2, 1, 2, 'install on react', '<p dir=\"auto\">برای نصب tiptap بر روی react بسته <code>@tiptap/react </code> را نصب کنیم </p><pre><code>npm install @tiptap/react </code></pre><h4 dir=\"auto\"><span style=\"color: #3559e9\">⁕ ایجاد سریع توسط Starterkit</span></h4><p dir=\"auto\"><span style=\"color: #080808\">ادیتور tiptap به صورت پیش فرض هیچ المنت، گره، و دستوری ندارد. این ما هستیم که باید این ویژگی ها را به کامپوننت tiptap اضافه کنیم، خوشبختانه تعداد زیادی اکستنش آماده وجود دارد که کافی است آنها را نصب نموده و به کامپوننت اضافه کرد. باز هم جای خرسندی دارد که یک بسته آماده وجود دارد که تعداد زیادی اکستنشن در خود جا داده که دیگر لازم نیست آن اکستنشن ها را نصب نمود این بسته محبوب </span><code>StarterKit </code> است که به صورت زیر نصب می‌شود.</p><pre><code>npm install @tiptap/starter-kit</code></pre><p dir=\"auto\">برای راحتی کار می‌توان هر دو بسته بالا را با هم نصب نمود به صورت زیر</p><pre><code>npm install @tiptap/react @tiptap/starter-kit</code></pre><p dir=\"auto\">پس از نصب این دو بسته می‌توانیم اولین ادیتور خود را راه اندازی کنیم به صورت زیر</p><pre><code class=\"language-js\">// src/Tiptap.jsx\nimport { useEditor, EditorContent } from \'@tiptap/react\'\nimport StarterKit from \'@tiptap/starter-kit\'\n\nconst Tiptap = () =&gt; {\n  const editor = useEditor({\n    extensions: [\n      StarterKit,\n    ],\n    content: \'&lt;p&gt;Hello World!&lt;/p&gt;\',\n  })\n\n  return (\n    &lt;EditorContent editor={editor} /&gt;\n  )</code></pre>', '2022-03-06 05:10:59', '2022-03-06 05:10:59'),
(3, 1, 3, 'نکات بیشتر در مورد starterKit', '<p dir=\"auto\">این پکیج یکی از محبوب ترین افزونهای tiptap است که برای شروع کار بسیار مناسب است، این پکیج افزونه های زیادی را در خود جای داده، این افزونه ها شامل موارد زیر می‌باشد</p><h3 dir=\"auto\">nodes</h3><ul dir=\"auto\"><li><p dir=\"auto\"><code>Blockquote</code></p></li><li><p dir=\"auto\"><code>BulletList</code></p></li><li><p dir=\"auto\"><code>CodeBlock</code></p></li><li><p dir=\"auto\"><code>Document</code></p></li><li><p dir=\"auto\"><code>HardBreak</code></p></li><li><p dir=\"auto\"><code>Heading</code></p></li><li><p dir=\"auto\"><code>HorizontalRule</code></p></li><li><p dir=\"auto\"><code>ListItem</code></p></li><li><p dir=\"auto\"><code>OrderedList</code></p></li><li><p dir=\"auto\"><code>Paragraph</code></p></li><li><p dir=\"auto\"><code>Text</code></p></li></ul><h3 dir=\"auto\"><strong><br>Marks</strong></h3><ul dir=\"auto\"><li><p dir=\"auto\"><code>Bold</code></p></li><li><p dir=\"auto\"><code>Code</code></p></li><li><p dir=\"auto\"><code>Italic</code></p></li><li><p dir=\"auto\"><code>Strike</code></p></li></ul><h3 dir=\"auto\"><strong><br>Extensions</strong></h3><ul dir=\"auto\"><li><p dir=\"auto\"><code>Dropcursor</code></p></li><li><p dir=\"auto\"><code>Gapcursor</code></p></li><li><p dir=\"auto\"><code>History</code></p></li></ul><p dir=\"auto\">همانطور که مشاهده می‌کنیم سه دسته افزونه در بالا لیست شده است، در tiptap افزونها به سه دسته زیر تقسیم می‌شوند</p><ol dir=\"auto\"><li><p dir=\"auto\"><strong>nodes</strong>     (گره ها)</p></li><li><p dir=\"auto\"><strong>marks</strong>   </p></li><li><p dir=\"auto\"> <strong>extensions</strong><br></p></li></ol>', '2022-03-06 10:48:15', '2022-03-09 08:45:42'),
(6, 2, 1, 'Introduction', '<p dir=\"auto\">با این افزونه به راحتی می‌توان یک جدول را در ادیتور به وجود آورد. این افزونه به ما این امکان را می‌دهد که جدول دلخواه و مورد نیازمان را ایجاد کنیم، به سهولت ردیف ها و ستونها را اضافه یا حذف کنیم، اندازه سلولها را به راحتی تغییر دهیم و تقریبا هر ویرایشی که جدول نیاز دارد را اعمال کنیم.</p>', '2022-03-09 09:06:14', '2022-03-09 09:06:14'),
(7, 2, 2, 'install', '<p dir=\"auto\">برای افزودن این افزونه به پروژه از دستور زیر استفاده می‌کنیم، با دستور زیر در واقع سه افزونه اضافه می‌شود، افزونه های <code>TableHeader</code> ، <code>TableRow</code> و <code>TableCell</code></p><pre><code>npm install @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell </code></pre><h5 dir=\"auto\"><br><br></h5>', '2022-03-09 09:28:21', '2022-03-09 12:09:25'),
(8, 2, 3, 'دستورها (commends)', '<h5 dir=\"auto\"><strong>- دستور </strong><code>insertTable()</code></h5><p dir=\"auto\">با این دستور یک جدول به ادیتور اضافه می‌شود، این دستور را به شکل باید مورد استفاده قرار داد</p><pre><code class=\"language-js\">editor.commands.insertTable()</code></pre><p dir=\"auto\"><span style=\"color: rgb(187, 187, 187); font-size: 0.8em\">JavaScript</span></p><p dir=\"auto\">چنانچه بخواهیم به طور پیش فرض جدول ما دارای ستون و ردیف باشد دستور بالا را به صورت زیر استفاده می‌کنیم</p><pre><code class=\"language-js\">editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })</code></pre><p dir=\"auto\"><span style=\"color: rgb(187, 187, 187); font-size: 0.8em\">JavaScript</span></p><h3 dir=\"auto\"><strong><span style=\"color: rgb(22, 66, 136)\">- دستور </span></strong><code>insertTable()</code></h3><p dir=\"auto\">با این دستور یک جدول به ادیتور اضافه می‌شود، این دستور را به شکل باید مورد استفاده قرار داد</p><pre><code class=\"language-js\">editor.commands.insertTable()</code></pre><p dir=\"auto\"></p><p dir=\"auto\">چنانچه بخواهیم به طور پیش فرض جدول ما دارای ستون و ردیف باشد دستور بالا را به صورت زیر استفاده می‌کنیم</p><pre><code class=\"language-js\">editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code> addColumnBefor()</code></h3><p dir=\"auto\">با این دستور می‌توان یک ستون قبل از ستون جاری ایجاد کرد، دستور به صورت زیر استفاده می‌شود</p><pre><code class=\"language-js\">editor.commands.addColumnBefore()</code></pre><h3 dir=\"auto\">- دستور <code>addColumnAfter() </code></h3><p dir=\"auto\">با این دستور می‌توان یک ستون بعد از ستون جاری ایجاد کرد، به صورت زیر</p><pre><code class=\"language-js\">editor.commands.addColumnAfter()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>deleteColumn() </code></h3><p dir=\"auto\"><strong>با این دستور می‌توان ستون جاری را حذف کرد، منظور از ستون جاری همان ستونی هست که فکوس بر روی آن می‌باشد</strong></p><pre><code class=\"language-js\">editor.commands.deleteColumn()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>addRowBefore() </code></h3><p dir=\"auto\">با اجرای این دستور یک ردیف قبل از ردیف جاری ایجاد می‌شود</p><pre><code class=\"language-js\">editor.commands.addRowBefore()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>addRowAfter() </code></h3><p dir=\"auto\">با اجرای این دستور یک ردیف بعد از ردیف جاری ایجاد می‌شود</p><pre><code class=\"language-js\">editor.commands.addRowAfter()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>deleteTable() </code></h3><p dir=\"auto\">با اجرای این دستور جدولی که فکوس روی آن است حذف می‌شود</p><pre><code class=\"language-js\">editor.commands.deleteTable()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>mergeCells()</code></h3><p dir=\"auto\">با اجرای این دستور خانه های انتخاب شده با هم یکی می‌شوند</p><pre><code class=\"language-js\">editor.commands.mergeCells()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>splitCell() </code></h3><p dir=\"auto\">با اجرای این دستور سلول یا خانه انتخاب شده به دو خانه تقسیم می‌شود، ولی در دموی نمایش داده شده در سایت tiptap این دستور کار نمی‌کند، بلکه در حال حاضر فقط می‌تواند سلولهای ادغام شده با دستور  <code>mergeCells() </code> را به حالت اول برگرداند، شاید در ورژنهای بعدی قابلیتی که برای این دستور ذکر شده عملیاتی شود و این مشکل اصلاح شود</p><pre><code class=\"language-js\">editor.commands.splitCell()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>toggleHeaderColumn()</code></h3><p dir=\"auto\">با اجرای این دستور اولین ستون چپ جدول  تبدیل به هدر می‌شود، این دستور قابلیت toggle کردن دارد، یعنی می‌توان با این دستور یک  ستون هدر  ایجاد کرد یا اینکه ستورن هدر با به یک ستون عادی تبدیل کرد</p><pre><code class=\"language-js\">editor.commands.toggleHeaderColumn()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>toggleHeaderCell()</code></h3><p dir=\"auto\">با اجرای این دستور اولین ردیف جدول تبدیل به هدر می‌شود، این دستور قابلیت toggle کردن دارد به این صورت که ردیف هدر را تبدیل به ردیف عادی می‌کند</p><pre><code class=\"language-js\">editor.commands.toggleHeaderCell()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>setCellAttribute(\'customAttribute\', \'value\')</code></h3><p dir=\"auto\">یکی از دستورات جالب tiptap می‌باشد، با این دستور می‌توان یک ویژگی css را به سلول جدول اضافه کنیم، البته لازم است ویژگی ای که می‌خواهیم اعمال کنیم را به عنوان آرگومان به دستور اضافه کرده باشیم، آرگومان اول نام ویژگی و آرگومان دوم مقدار ویژگی</p><pre><code class=\"language-js\">editor.commands.setCellAttribute(\'customAttribute\', \'value\') \neditor.commands.setCellAttribute(\'backgroundColor\', \'#000\')</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>goToNextCell()</code> </h3><p dir=\"auto\">این دستور فوکوس را به سلول بعد انتقال می‌دهد</p><pre><code class=\"language-js\">editor.commands.goToNextCell()</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\">- دستور <code>goToPreviousCell()</code></h3><p dir=\"auto\">این دستور فوکوس را به سلول قبلی انتقال می‌دهد</p><pre><code class=\"language-js\">editor.commands.goToPreviousCell()</code></pre><p dir=\"auto\"><br></p>', '2022-03-09 12:08:58', '2022-03-10 07:05:13'),
(9, 4, 1, 'introducton (معرفی)', '<p dir=\"auto\">جیسون (json) یک استاندارد متنی و سبک برای انتقال داده است. این استاندارد اولین بار در زبان جاوااسکریپت پیاده سازی شد و به مرور در زبانهای دیگر نیز وارد شد.</p><p dir=\"auto\">این کلمه مخفف javascript object notation است.</p><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">از این استاندارد برای انتقال داده ساخت‌یافته بین نرم‌افزارها استفاده می‌شود. این انتقال می‌تواند به طور مستقیم بر بستر شبکه بوده یا برای انتقال داده بین سرور و کلاینت استفاده شود.</span></p><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">یکی از پر کاربردترین استفاده‌های JSON استفاده از آن برای </span><strong>انتقال پیام‌های وب‌سرویس</strong><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> و </span><strong>API</strong><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> ها در برنامه‌هاست.</span></p><h3 dir=\"auto\" style=\"text-align: justify\"><strong>ظاهر Json</strong></h3><ul dir=\"auto\"><li><p dir=\"auto\">داده‌ها در Json به صورت نام/مقدار قرار می‌گیرند.</p></li><li><p dir=\"auto\">داده‌ها با علامت کاما از هم جدا می‌شوند.</p></li><li><p dir=\"auto\">اشیاء با علامت { } نشان داده می‌شوند.</p></li><li><p dir=\"auto\">آرایه‌ها با علامت [ ] نشان داده می‌شوند.</p></li></ul><p dir=\"auto\"></p><h2 dir=\"auto\" style=\"text-align: justify\"><strong>داده‌های Json</strong></h2><p dir=\"auto\" style=\"text-align: justify\">داده‌های Json به صورت زوج‌های name/value نوشته می‌شوند؛ دقیقا مانند خصوصیات اشیاء جاوا اسکریپت با این تفاوت که نام‌ها در Json باید درون جفت کوتیشن قرار گیرند اما در جاوا اسکریپت به این شکل نمی‌باشد.</p><pre><code class=\"language-js\">{\"name\":\"ali\"}</code></pre><p dir=\"auto\"></p><h3 dir=\"auto\" style=\"text-align: justify\"><strong>انواع داده‌های Json</strong></h3><p dir=\"auto\" style=\"text-align: start\">انواع داده‌ها در Json عبارتند از:</p><ul dir=\"auto\"><li><p dir=\"auto\">String</p></li><li><p dir=\"auto\">Number</p></li><li><p dir=\"auto\">Object</p></li><li><p dir=\"auto\">Array</p></li><li><p dir=\"auto\">Boolean</p></li><li><p dir=\"auto\">Null</p></li></ul><p dir=\"auto\" style=\"text-align: start\">مقادیر زیر نمی‌توانند جزء داده‌های Json باشند:</p><ul dir=\"auto\"><li><p dir=\"auto\">Function</p></li><li><p dir=\"auto\">Date</p></li><li><p dir=\"auto\">Undefined</p></li></ul><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">در ادامه این درس، json در php و javascript را دنبال می‌کنیم.</span></p><p dir=\"auto\"></p>', '2022-03-13 02:07:44', '2022-03-16 01:01:03'),
(10, 5, 1, 'تبدیل متغییر به json', '<p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">برای تبدیل یک مقدار (یا متغیر) به </span><span style=\"color: rgb(0, 0, 255); font-size: 18px\">JSON</span><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> از تابع </span><code>json_encode()</code><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> در </span><span style=\"color: rgb(0, 0, 255); font-size: 18px\">PHP</span><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> استفاده می‌کنیم. این تابع یک ورودی اجباری و یک ورودی اختیاری داشته و نتیجه را به شکل boolean (</span><span style=\"color: rgb(131, 0, 173); font-size: 18px\">0</span><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> و </span><span style=\"color: rgb(131, 0, 173); font-size: 18px\">1</span><span style=\"color: rgb(33, 37, 41); font-size: 18px\">) برمی‌گرداند.</span></p><pre><code class=\"language-php\">json_encode( $value, $options )</code></pre><p dir=\"auto\">پارامتر اول اجباری می‌باشد و می‌تواند هر چیزی بغیر از منبع (<span style=\"color: rgb(0, 0, 255); font-size: 18px\">resource) </span><span style=\"color: rgb(5, 5, 5); font-size: 18px\">باشد، </span><span style=\"color: rgb(33, 37, 41); font-size: 18px\">البته در اکثر موارد از آرایه PHP یا اشیاء (</span><span style=\"color: rgb(0, 0, 255); font-size: 18px\">object</span><span style=\"color: rgb(33, 37, 41); font-size: 18px\">ها) استفاده می‌شود.</span></p><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">پارامتر دوم اختیاری است و متغیری برای اعمال تنظیمات خاص روی عملیات </span><strong>تبدیل متغیر به JSON</strong><span style=\"color: rgb(33, 37, 41); font-size: 18px\"> استفاده می‌شود.</span></p><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">مثال: تبدیل آرایه به json</span></p><pre><code class=\"language-php\">  $scores = array(\'sara\' =&gt; 17, \'ehsan\' =&gt; 19, \'omid\' =&gt; 18, \'nazanin\' =&gt; 18);\n\n    $json = json_encode( $scores );\n    echo $json;\n\n    // result\n    {\"sara\":17,\"ehsan\":19,\"omid\":18,\"nazanin\":18}\n</code></pre><p dir=\"auto\"></p><p dir=\"auto\"><span style=\"font-size: 18px\">مثال: تبدیل اشیاء به json</span></p><pre><code class=\"language-php\">Class Person {\n        public $name = \"\";\n        public $age = null;\n        public $scores = array();\n    }\n\n    $p = new Person();\n    $p-&gt;name  = \"Nazanin\";\n    $p-&gt;age   = 22;\n    $p-&gt;scores= array(17,19,15.5,18,20);\n\n    echo json_encode( $p );\n\n    // result\n    {\"name\":\"Nazanin\",\"age\":22,\"scores\":[17,19,15.5,18,20]}\n\n</code></pre><h4 dir=\"auto\">نکته:: خروجی آرایه انجمنی یک object هست و خروجی آرایه غیرانجمنی یک آرایه هست. به مثال توجه کنید</h4><pre><code class=\"language-php\">$arry=[\'zabi\', \'rahimi\', \'man\', 1360];\njson_encode($arry);\n//result\n[\"zabi\",\"rahimi\",\"man\",1360]\n\n\n$arry2=[\'name\'=&gt; \'zabi\', \'family\'=&gt; \'rahimi\', \'gender\'=&gt; \'man\', \'Birth Date\'=&gt;1360];\njson_encode($arry2);\n//result\n{\"name\":\"zabi\",\"family\":\"rahimi\",\"gender\":\"man\",\"Birth Date\":1360}\n</code></pre><p dir=\"auto\">پارامتر دوم نوع رمزنگاری json را مشخص می‌کند، برای رمزنگاریهای مختلف می‌توان ثابت های زیر را به عنوان پارامتر دوم ارسال کرد، همچنین می‌توان ثابت و پرچمهای زیر را به صورت گروهی به عنوان پارامتر دوم ارسال کرد</p><table><tbody><tr><th colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\" style=\"text-align: center\">پرچم (flag)</p></th><th colspan=\"1\" rowspan=\"1\"><p dir=\"auto\" style=\"text-align: center\">توضیح و مثال</p></th></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_HEX_TAG</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">علامت <code>&lt; </code>را تبدیل به <code>\\u003C</code> و علامت <code>&gt; </code>را تبدیل به <code>\\u003E</code><span style=\"color: rgb(51, 51, 51); font-size: 18px\"> </span>می‌کند.</p><p dir=\"auto\">مثال: <code>&lt;div&gt; </code>را تبدیل به <code>\\u003C div \\u003E </code>می‌کند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_HEX_AMP</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">همه <code>&amp; </code>را تبدیل به <code>\\u0026</code> می‌کند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_HEX_APOS</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">همه <code>\' </code>را تبدیل به <code>\\u0027 </code><span style=\"color: rgb(51, 51, 51); font-size: 18px\">می‌کند.</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_HEX_QUOT</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">همه <code>\" </code>را تبدیل به <code>\\u0022 </code>می‌کند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_FORCE_OBJECT</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">وقتی از آرایه غیر انجمنی استفاده می شود، به جای آرایه، یک شی را برمی‌گرداند. به خصوص زمانی مفید است که گیرنده خروجی منتظر یک شی است و آرایه خالی است.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_NUMERIC_CHECK</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">رشته های اعداد را به صورت اعداد رمز می‌کند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_PRETTY_PRINT</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">از فضای خالی در داده های برگشتی برای قالب بندی استفاده می‌کند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_UNESCAPED_SLASHES</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\"><span style=\"color: rgb(51, 51, 51); font-size: 18px\">Don\'t escape </span><code>/</code><span style=\"color: rgb(51, 51, 51); font-size: 18px\">.</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_UNESCAPED_UNICODE</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">کاراکترهای چند بایتی یونیکد را به معنای واقعی کلمه رمزگذاری می‌کند (پیش‌فرض فرار به صورت \\uXXXX است).</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_INVALID_UTF8_IGNORE</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">نویسه های نامعتبر <code>UTF_8 </code>را نادیده می‌گیرد.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_INVALID_UTF8_SUBSTITUTE</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">نویسه‌های <code>UTF-8</code> نامعتبر را به <code>\\0xfffd</code> تبدیل می‌کند. (نویسه یونیکد \'جایگزین نویسه\') از <code>PHP 7.2.0</code> موجود است.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_PRESERVE_ZERO_FRACTION</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">اطمینان حاصل می کند که مقادیر اعشاری<code>float</code> همیشه به عنوان یک مقدار اعشاری کدگذاری می شوند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_UNESCAPED_LINE_TERMINATORS</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\"></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_THROW_ON_ERROR</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">اگر خطایی رخ دهد، به جای تنظیم حالت خطای گلوبال که با <code>json_last_error()</code> و <code>json_last_error_msg ()</code> بازیابی می شود، <code>JsonException</code> را پرتاب می کند.</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"256\"><p dir=\"auto\"><code>JSON_PARTIAL_OUTPUT_ON_ERROR</code></p></td><td colspan=\"1\" rowspan=\"1\"><p dir=\"auto\">بر <code>JSON_THROW_ON_ERROR</code> اولویت دارد.</p></td></tr></tbody></table><h3 dir=\"auto\">با استفاده از پرچم ها می توانیم خروجی بهینه تر و خوانا تری دریافت کنیم</h3><h6 dir=\"auto\">مثالهایی برای پرچم ها</h6><pre><code class=\"language-php\">$array = [\'€\', \'http://example.com/some/cool/page\', \'337\'];\n\n$bad   = json_encode($array);\n$good  = json_encode($array,  JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);\n\n//result\n// $bad would be  [\"\\u20ac\",\"http:\\/\\/example.com\\/some\\/cool\\/page\",\"337\"]\n\n// $good would be [\"€\",\"http://example.com/some/cool/page\",337]</code></pre><p dir=\"auto\"></p><pre><code class=\"language-php\">$a = array(\'&lt;foo&gt;\',\"\'bar\'\",\'\"baz\"\',\'&amp;blong&amp;\', \"\\xc3\\xa9\");\n\n  json_encode($a);\n  //result\n  [\"&lt;foo&gt;\",\"\'bar\'\",\"\\\"baz\\\"\",\"&amp;blong&amp;\",\"\\u00e9\"]\n\n\n  json_encode($a, JSON_HEX_TAG)\n  //result\n  [\"\\u003Cfoo\\u003E\",\"\'bar\'\",\"\\\"baz\\\"\",\"&amp;blong&amp;\",\"\\u00e9\"]\n\n  json_encode($a, JSON_HEX_APOS)\n  //result\n  [\"&lt;foo&gt;\",\"\\u0027bar\\u0027\",\"\\\"baz\\\"\",\"&amp;blong&amp;\",\"\\u00e9\"]\n\n  json_encode($a, JSON_HEX_QUOT)\n  //result\n[\"&lt;foo&gt;\",\"\'bar\'\",\"\\u0022baz\\u0022\",\"&amp;blong&amp;\",\"\\u00e9\"]\n\n  json_encode($a, JSON_HEX_AMP)\n  //result\n  [\"&lt;foo&gt;\",\"\'bar\'\",\"\\\"baz\\\"\",\"\\u0026blong\\u0026\",\"\\u00e9\"]\n\n  json_encode($a, JSON_UNESCAPED_UNICODE)\n  //result\n  [\"&lt;foo&gt;\",\"\'bar\'\",\"\\\"baz\\\"\",\"&amp;blong&amp;\",\"é\"]\n\n  json_encode($a, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE)\n  //result\n  [\"\\u003Cfoo\\u003E\",\"\\u0027bar\\u0027\",\"\\u0022baz\\u0022\",\"\\u0026blong\\u0026\",\"é\"]\n</code></pre>', '2022-03-13 02:32:05', '2022-03-14 04:09:28'),
(11, 5, 2, 'تبدیل json به متغییر', '<p dir=\"auto\">برای برگشت به حالت اول متغییرهایی که توسط تابع <code>json_encode() </code>به جسون تبدیل شده اند از تابع <code>json_decode() </code>استفاده می‌کنیم.</p><pre><code class=\"language-php\">json_decode( $json, $assoc, $depth, $options )</code></pre><p dir=\"auto\">این تابع چهار پارامتر می‌گیرد، اولین پارامتر اجباری هست و بقیه اختیاری می‌باشند.</p><p dir=\"auto\">اولین پارامتر همان متن json هست که میخواهیم آن را به یک متغییر php تبدیل کنیم. این رشته باید با یونیک <code>UTF_8 </code>کدگذاری شده باشد.</p><p dir=\"auto\">خروجی این تابع یک آرایه و یا یک شی می‌باشد.</p><p dir=\"auto\">پارامتر دوم (<code>$assoc</code>)  به طور پیش‌فرض <span style=\"color: red\">false</span> است. اگر آن را <span style=\"color: rgb(0, 204, 0)\">true</span> کنیم، مقدار بازگشتی به شکل آرایه انجمنی PHP (آرایه‌های کلید-مقدار) خواهد بود.</p><p dir=\"auto\">پارامتر سوم  <code>$depth</code>  عمق بازگشت در پیام JSON را مشخص می‌کند. به این معنی که در سلسله مراتب پیام JSON تا چه عمقی پیشروی کند. مقدار پیش‌فرض آن 512 است.</p><p dir=\"auto\">پارامتر  چهارم <code>$options</code>  نیز یک bitmask به شکل عدد صحیح است که تنظیمات خاصی را برای نوع <span style=\"color: navy\">فرمت JSON</span> ورودی مشخص می‌کند.</p><h4 dir=\"auto\">مثال: </h4><pre><code class=\"language-php\">$json = \'{\"sara\":17,\"ehsan\":19,\"omid\":18,\"nazanin\":18}\';\n	\n    $scores = json_decode( $json );\n    var_dump($scores);\n\n   //result\n\n  object(stdClass)#1 (4) {\n  [\"sara\"]    =&gt; int(17)\n  [\"ehsan\"]   =&gt; int(19)\n  [\"omid\"]    =&gt; int(18)\n  [\"nazanin\"] =&gt; int(18)\n}\n\n</code></pre><p dir=\"auto\">خروجی مثال بالا یک شی است. چرا؟ چون پارامتر دوم را مقدار دهی نکردیم و به طور پیش فرض <code>  false   </code>  است.  به طور مثال برای دستیبای به نمره sara باید این گونه عمل کنیم <code>$scores -&gt; sara </code></p><pre><code class=\"language-php\"> $json = \'{\"sara\":17,\"ehsan\":19,\"omid\":18,\"nazanin\":18}\';\n\n    $scores = json_decode( $json, true );\n    var_dump($scores);\n\n // result\n array(4) {\n   [\"sara\"]    =&gt; int(17)\n   [\"ehsan\"]   =&gt; int(19)\n   [\"omid\"]    =&gt; int(18)\n   [\"nazanin\"] =&gt; int(18)\n }\n</code></pre><p dir=\"auto\">همانطور که قابل مشاهده است، خروجی کد بالا یک آرایه است، چون مقدار دوم را <code> true  </code>  قرار دادیم. برای دستیابی نمره sara نیز اینگونه عمل می‌کنیم <code>$scores[\'sara\']</code></p><p dir=\"auto\"></p><p dir=\"auto\"><br></p>', '2022-03-14 04:17:53', '2022-03-14 04:34:37'),
(12, 5, 3, 'توابع تکمیلی json در php', '<p dir=\"auto\">دو تابع دیگر داریم که بسیار کمتر از دو تابع اصلی استفاده می‌شود. اگر اجرای هر کدام از دو تابع بالا دچار خطایی شود، با استفاده از این توابع می‌توانیم خطای رخ داده را شناسایی کرده و تصمیم مناسب بگیریم.</p><p dir=\"auto\" style=\"text-align: right\">می‌توانیم از این ۲ تابع برای مدیریت خطا در PHP استفاده کنیم.</p><p dir=\"auto\" style=\"text-align: right\">در جدول زیر، <strong><span style=\"color: rgb(0, 136, 0)\">جمع‌بندی توابع کار با JSON در PHP</span></strong> آورده شده است:</p><table><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"313\"><p dir=\"auto\"><span style=\"color: rgb(24, 0, 156); font-size: 18px\">json_encode()</span></p></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"387\"><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">تبدیل متغیر ورودی به JSON</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"313\"><p dir=\"auto\"><span style=\"color: rgb(24, 0, 156); font-size: 18px\">json_decode()</span></p></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"387\"><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">تبدیل رشته JSON به متغیر PHP</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"313\"><p dir=\"auto\"><span style=\"color: rgb(24, 0, 156); font-size: 18px\">json_last_error()</span></p></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"387\"><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">کد آخرین خطای اتفاق افتاده</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"313\"><p dir=\"auto\"><span style=\"color: rgb(24, 0, 156); font-size: 18px\">json_last_error_msg()</span></p></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"387\"><p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 18px\">متن پیام آخرین خطا</span></p></td></tr></tbody></table>', '2022-03-14 04:38:06', '2022-03-14 04:38:06'),
(13, 6, 1, 'تابع ()JSON.parse', '<p dir=\"auto\"><span style=\"color: rgb(50, 74, 98); font-size: 20px\">همان‌طور که می‌دانیم با استفاده از Json، داده‌ها را از سرور یا بالعکس انتقال می‌دهیم که این داده‌های دریافت شده از سرور به صورت رشته هستند. داده‌ها توسط تابع ()JSON.parse تجزیه و به یک شی جاوا اسکریپت تبدیل می‌شوند.</span></p><pre><code class=\"language-js\">var obj = JSON.parse(\'{ \"name\":\"ali\", \"age\":30, \"city\":\"NewYork\"}\');</code></pre>', '2022-03-16 01:05:14', '2022-03-16 01:05:14'),
(14, 6, 2, 'تابع ()JSON.stringify', '<p dir=\"auto\"><span style=\"color: rgb(50, 74, 98); font-size: 20px\">با استفاده از تابع &nbsp;JSON.stringify می‌توان یک شی JavaScript را به یک رشته تبدیل کرد.</span></p><pre><code class=\"language-js\">var obj = { name: \"ali\", age: 30, city: \"New York\" };\nvar myJSON = JSON.stringify(obj);</code></pre><p dir=\"auto\">در مثال بالا myJSON یک رشته است که آماده فرستاده‌ شدن به سمت سرور است.</p><p dir=\"auto\" style=\"text-align: justify\">با استفاده از این تابع همچنین می‌توان آرایه‌های جاوا‌ اسکریپت را به رشته تبدیل کرد.</p><pre><code class=\"language-js\">var arr = [ \"ali\", \"sara\", \"shiva\", \"reza\" ];\nvar myJSON = JSON.stringify(arr);</code></pre>', '2022-03-16 01:36:34', '2022-03-16 01:37:48'),
(15, 6, 3, 'اشیاء Json', '<p dir=\"auto\"><span style=\"color: rgb(50, 74, 98); font-size: 20px\">اشیاء Json درون علامت {} نوشته می‌شوند. نام‌ها باید رشته‌ای و مقادیر باید یک نوع داده Json باشند.</span></p>', '2022-03-16 01:38:29', '2022-03-16 01:38:29'),
(16, 6, 4, 'نحوه دست یابی به مقادیر json', '<p dir=\"auto\">به دو روش زیر می‌توان به مقادیر json دست یافت</p><p dir=\"auto\">استفاده از <code>. </code>به صورت زیر</p><pre><code class=\"language-js\">cars= {\"name\":\"BMW\", \"color\":\"black\"};\nx = cars.name;// result BMW</code></pre><p dir=\"auto\">همچنین می‌توانیم با علامت <code>[] </code>به مقادیر دست یافت ، به مثال زیر توجه کنید</p><pre><code class=\"language-js\">cars= {\"name\":\"BMW\", \"color\":\"black\"};\nx = cars[\'name\']; // result BMW</code></pre><h3 dir=\"auto\">نکته: در روش براکت، کلید حتما باید در کوتیشن قرار بگیرد ولی  در روش نقطه، کلید باید مثل یک متغییر مورد استفاده قرار گیرد</h3><p dir=\"auto\">برای دست یابی به مقادیر json تودرتو می‌توان به دو صورت زیر عمل کرد</p><p dir=\"auto\">استفاده از نقطه به ازای هر لایه</p><pre><code class=\"language-js\">myObj = {\n  \"name\":\"ali\",\n  \"age\":25,\n  \"cars\": {\n    \"car1\":\"Ford\",\n    \"car2\":\"BMW\",\n    \"car3\":\"Fiat\"\n  } }\n\nmyObj.cars.car1; // result Ford</code></pre><p dir=\"auto\">استفاده تلفیقی نقطه و براکت</p><pre><code class=\"language-js\">myObj = {\n  \"name\":\"ali\",\n  \"age\":25,\n  \"cars\": {\n    \"car1\":\"Ford\",\n    \"car2\":\"BMW\",\n    \"car3\":\"Fiat\"\n  } }\n\n myObj.cars[\"car2\"]; // result BMW</code></pre>', '2022-03-16 01:52:42', '2022-03-16 01:55:38'),
(17, 6, 5, 'فایل با پسوند json.', '<p dir=\"auto\"><span style=\"color: rgb(33, 37, 41); font-size: 16px\">یک شیء JSON می‌تواند در فایل خاص خود ذخیره شود که اساساً یک فایل متنی با پسوند json. و نوع MIME به صورت application/json است.</span></p>', '2022-03-16 02:08:46', '2022-03-16 02:08:46'),
(18, 7, 1, 'introduction', '<p dir=\"auto\">معنی prototype یعنی نمونه اولیه، در js آبجکت ها می توانند ارث بری داشته باشند، که به وسیله prototype ارث بری اعمال میشه، البته هر آبجکتی قطعا یک prototype دارد و نمی تواند بیش از یک prototype داشته باشد.</p><p dir=\"auto\">م. prototype هر آبجکت در واقع یک ویژگی (property) به اسم <code>__proto__ </code> هست که دارای یکی از این دو مقدار هست</p><ol dir=\"auto\"><li><p dir=\"auto\">null</p></li><li><p dir=\"auto\">یک object دیگر</p></li></ol><p dir=\"auto\">پس همه object ها یک property به اسم <code> __proto__ </code>   دارند.</p><p dir=\"auto\">اگر مقدار ویژگی <code>__proto__ </code> یک object باشد این آبجکت حکم والد را برای آبجکت ما دارد که می توانیم ویژگی آن را با آبجکت خودمان صدا بزنیم. </p>', '2022-03-21 01:25:16', '2022-03-21 01:25:16'),
(19, 7, 2, 'ست کردن والد یا نمونه اولیه برای آبجکت', '<p dir=\"auto\">برای اینکه برای یک آبجکت یک والد ست کنیم کافی است که والد مورد نظر را به ویژگی <code>__proto__ </code>اختصاص دهیم به مثال زیر توجه کنید.</p><pre><code class=\"language-js\">const company={\n      nameCo:\'sipa\',\n      country:\'iran\',\n      address:\'tehran\',\n      tel:02145675666,\n  }\n\n const car={\n      name:\'pride\',\n      passenger:4,\n      color:\'white\',\n      fuel_consumption:(kh)=&gt;{\n          if (kh &lt;= 20) {console.log(\'5 liters per hundred kilometers\');} \n          else if(kh &lt;=40){console.log(\'6 liters per hundred kilometers\');}\n          else if(kh &lt;=100){console.log(\'8 liters per hundred kilometers\');}\n          else if(kh &gt;100){console.log(\'13 liters per hundred kilometers or more\');}\n      }\n\n  } \n\n car.__proto__=company;</code></pre><p dir=\"auto\">در بالا دوتا آبجکت وجود دارد، آبجکت لول مربوط به مشخصات شرکت است و آبجکت دوم مشخصات خودرو را دخیره کرده است. ما می خواهیم آبجکت خودرو از آبجکت شرکت ارث بری کندو در خط آخر این کار را کرده ایم همانطور که مشخص است با صدا زدن ویژگی <code>__proto__ </code> و تخصیص مقدار company به این ویژگی، ارث بری را اعمال کرده ایم در ادامه خواهیم دید چگونه می توان ویژگی های والد را صدا زد.</p>', '2022-03-21 02:16:01', '2022-03-21 02:22:21'),
(20, 7, 3, 'فراخوانی ویژگی های (property) والد (prototype)', '<p dir=\"auto\">پس از اینکه یک object دیگر را به عنوان والد برای object مورد نظر اعمال کردیم به راحتی می توانیم ویژگی ها و متدهای آبجکت والد را از طریق آبجکت فرزند صدا بزنیم. این فراخوانی دقیقا مانند فراخوانی ویژگی و متد خودِ آبجکت می‌باشد. </p><pre><code class=\"language-js\"> const company={\n    nameCo:\'saipa\',\n    country:\'iran\',\n    address:\'tehran\',\n    tel:02145675666,\n    fun:()=&gt;{\n        console.log(\'company saipa iran\');\n    }\n}\n  const car={\n      name:\'pride\',\n      passenger:4,\n      color:\'white\',\n\n  }\n\n  \n\n  car.__proto__=company;\n  console.log(car.nameCo); \n  // result =&gt; saipa\n \n  console.log(car.fun());\n // result =&gt; company saipa iran\n\n console.log(car.name);\n // result =&gt; pride\n\n</code></pre>', '2022-03-21 02:32:34', '2022-03-21 02:32:34'),
(21, 7, 4, 'استفاده از ()Object.create برای مشخص کردن prototype', '<p dir=\"auto\">ویژگی <code>__Proto__  </code>  از ES6 به بعد وارد js شد قبل از اون از متد <code>Object.create() </code> برای ارث بری استفاده می‌شد به صورت زیر</p><pre><code class=\"language-js\">const p= {\n  nameP:\'hassan\'\n}\n\nlet ch={\n  mame:\'reza\'\n}\n ch=Object.create(p);\n\nch.nameP\n// resutl =&gt; hassan\n</code></pre><h4 dir=\"auto\">نکته : اعمال ارث بری با این روش متغییر فرزند نمی تواند از نوع const باشد باید از نوع let  و یا var باشد. </h4>', '2022-03-21 02:46:15', '2022-03-21 02:46:15'),
(22, 8, 1, 'introduction', '<p dir=\"auto\">برای اجرای همزمان دو یا چند پروژه لاراولی لازم است که پورت های پروژه ها با هم متفاوت باشد، در یک پروژه لاراول به صورت پیش فرض پورت بر روی 8000 می‌باشد، اگر قرار است چند پروژه  را با هم اجرا کنیم باید پورت ها با هم متفاوت باشد. مثلا اگر سه پروژه باشد می‌توان پورت ها را اینگونه مقدار دهی کرد، پروژ اول پورت 8000، پروژه دوم پورت 8001، و پروژه سوم پورت 8002، در ادامه نحوه تغییر پورت ها را خواهیم دید.</p>', '2022-03-31 03:16:11', '2022-03-31 03:16:11'),
(23, 8, 2, 'تغییر پورت به صورت موقت', '<p dir=\"auto\">چنانچه بخواهیم به صورت موقت پورت یک پروژه لاراول را از 8000 به پورت دیگر تغییر دهیم، هنگام اجرای پروژه به صورت زیر عمل می‌کنیم (تغییر به پورت 8001)</p><pre><code class=\"language-php\">php artisan serve --host 127.0.0.1 --port 8001</code></pre><p dir=\"auto\">حال برای دسترسی به پروژه در مرورگر باید آدرس زیر را وارد کنیم</p><pre><code class=\"language-php\">localhost:8001</code></pre>', '2022-03-31 03:22:30', '2022-03-31 03:22:30'),
(24, 8, 3, 'تغییر پورت به صورت دائم', '<p dir=\"auto\">برای تغییر پورت پروژه لاراول از 8000 به پورت دیگر ( مثلا 8001 ) کافی است که در فایل <code> env </code> ثابت زیر را وارد نماییم</p><pre><code class=\"language-php\">// .env\nSERVER_PORT=8001</code></pre><p dir=\"auto\">حال با اجرای دستور اجرای  لارول، دسترسی به پروژه در مرورگر با پورت 8001 میسر است</p><pre><code class=\"language-php\">$ php artisan serve\n Laravel development server started: http://127.0.0.1:8001</code></pre>', '2022-03-31 03:29:04', '2022-03-31 03:29:04'),
(25, 9, 1, 'ایجاد متغیر', '<p dir=\"auto\">ایجاد متغیر</p>', '2022-12-25 10:03:31', '2022-12-25 10:03:31'),
(26, 10, 1, 'آرایه ها در php', '<p dir=\"auto\">array</p>', '2022-12-26 04:46:27', '2022-12-26 04:46:27'),
(27, 12, 1, 'introduction', '<p dir=\"auto\">همانطور که می دانیم از متغییر برای دخیره یک مقدار استفاده می کنیم، چنانچه بخواهیم چندین مقدار را در آرایه ذخیره کنیم باید از آرایه ها کمک بگیریم، در js  ما می توانیم هر داده و مقداری با هر نوعی را در یک آریه ذخیره کنیم.</p><p dir=\"auto\">جاواسکریپت توابع و متدهای بسیار متنوعی برای کار با آرایه ها ایجاد کرده است، که در ادامه با کاربردی ترین آنها آشنا خواهیم شد</p>', '2023-01-22 02:16:26', '2023-01-22 02:16:26'),
(28, 13, 1, 'introduction', '<p dir=\"auto\">چنانچه بخواهیم چندین مقدار از یک نوع را در یک متغییر ذخیره کنیم باید از آرایه ها استفاده کینم، در ++c آریه ها فقط مقدایری از یک نوع مشخص را ذخیره می کنند </p><p dir=\"auto\">بر خلاف آرایه ها در js که می توانند انواع متفاوتی از مقادیر را در درون خود جای دهند</p>', '2023-01-22 02:23:16', '2023-01-22 02:23:16'),
(29, 14, 1, 'introduction', '<p dir=\"auto\">در php نیز مانند تمام زبان ها برای ذخیره چندین مقدار در یک متغییر آرایه ها تعریف شده اند</p>', '2023-01-22 02:27:21', '2023-01-22 02:27:21'),
(30, 12, 2, 'create array', '<p dir=\"auto\">ایجاد آرایه در js</p>', '2023-01-23 02:29:38', '2023-01-23 02:29:38'),
(31, 13, 2, 'create array in c++', '<p dir=\"auto\">ایجاد آرایه در ++c</p>', '2023-01-23 02:30:36', '2023-01-23 02:30:36');

-- --------------------------------------------------------

--
-- Table structure for table `lesson_types`
--

CREATE TABLE `lesson_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_type_id` bigint(20) UNSIGNED NOT NULL,
  `lesson` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(95) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lesson_types`
--

INSERT INTO `lesson_types` (`id`, `book_type_id`, `lesson`, `link`, `created_at`, `updated_at`) VALUES
(1, 1, 'What’s Tiptap', 'whats-tiptap', '2022-03-06 04:29:10', '2022-03-06 04:29:10'),
(2, 2, 'condolence تسلیت', 'condolence', '2022-03-12 04:15:42', '2022-03-12 04:15:42'),
(3, 3, 'Introduction', 'Introduction', '2022-03-12 06:42:16', '2022-03-12 06:42:16'),
(4, 4, 'one', 'one', '2022-03-13 02:14:40', '2022-03-13 02:14:40'),
(5, 5, 'one', 'one', '2022-03-21 00:47:13', '2022-03-21 00:47:13'),
(6, 6, 'internet 1', 'internet1', '2022-03-23 02:27:27', '2022-03-23 02:27:27'),
(7, 7, 'grid', 'grid', '2022-03-26 02:36:31', '2022-03-26 02:36:31'),
(8, 6, 'general', 'general', '2022-04-15 02:07:44', '2022-04-15 02:07:44'),
(9, 8, 'one', 'one', '2022-05-04 23:27:51', '2022-05-04 23:27:51'),
(10, 9, 'one', 'one', '2022-05-05 01:24:53', '2022-05-05 01:24:53'),
(11, 10, 'one', 'one', '2022-05-11 00:45:24', '2022-05-11 00:45:24'),
(12, 10, 'two', 'two', '2022-05-16 01:02:04', '2022-05-16 01:02:04'),
(13, 10, 'three', 'three', '2022-05-20 23:56:08', '2022-05-20 23:56:08'),
(14, 12, 'one', 'one', '2022-07-01 23:44:06', '2022-07-01 23:44:06'),
(15, 6, 'four', 'four', '2022-07-26 09:43:11', '2022-07-26 09:43:11'),
(16, 6, 'five', 'five', '2022-07-29 01:19:51', '2022-07-29 01:19:51'),
(17, 6, 'six', 'six', '2022-07-29 14:58:25', '2022-07-29 14:58:25'),
(18, 6, 'seven', 'seven', '2022-08-02 03:08:01', '2022-08-02 03:08:01'),
(19, 6, 'eight', 'eight', '2022-08-05 01:56:07', '2022-08-05 01:56:07'),
(20, 6, 'nine', 'nine', '2022-08-16 00:44:41', '2022-08-16 00:44:41'),
(21, 14, 'one', 'one', '2022-08-16 08:18:33', '2022-08-16 08:18:33'),
(22, 6, 'ten', 'ten', '2022-12-21 05:08:58', '2022-12-21 05:08:58'),
(23, 6, 'eleven', 'eleven', '2022-12-23 12:26:43', '2022-12-23 12:26:43');

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_section_id` bigint(20) UNSIGNED NOT NULL COMMENT 'شناسه بخشی که به آن لینک شده',
  `has_link_id` int(11) NOT NULL COMMENT 'شناسه بخشی که لینک در آن ایجاد شده'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2021_11_25_075118_create_books_table', 1),
(6, '2021_11_25_075406_create_lessons_table', 1),
(7, '2021_11_25_080024_create_lesson_sections_table', 1),
(8, '2022_01_08_063353_create_book_types_table', 1),
(9, '2022_01_08_070254_create_lesson_types_table', 1),
(10, '2022_01_08_072930_create_words_table', 1),
(11, '2022_01_08_073023_create_sentences_table', 1),
(25, '2023_01_08_090134_create_links_table', 2),
(26, '2023_01_17_062506_create_jobs_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sentences`
--

CREATE TABLE `sentences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `word_id` bigint(20) UNSIGNED NOT NULL,
  `sentence` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mean` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'معنی',
  `pronounceEn` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'تلفظ به انگلیسی',
  `pronounceFa` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'تلفظ به فارسی',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sentences`
--

INSERT INTO `sentences` (`id`, `word_id`, `sentence`, `mean`, `pronounceEn`, `pronounceFa`, `created_at`, `updated_at`) VALUES
(7, 84, 'the doctors said she had only six months to live', 'دکتر ها گفتند که او تنها شش ماه دیگر زنده است', NULL, NULL, '2022-05-04 23:31:49', '2022-05-04 23:31:49'),
(8, 85, 'live animals', 'حیوانات زنده', NULL, NULL, '2022-05-04 23:34:20', '2022-05-04 23:34:20'),
(9, 85, 'you only live once', 'شما فقط یک بار زندگی می کنید', NULL, NULL, '2022-05-04 23:36:06', '2022-05-04 23:36:06'),
(10, 86, 'i need you by my side', 'به وجودت در کنارم احتیاج دارم', NULL, NULL, '2022-05-04 23:45:20', '2022-05-04 23:45:20'),
(11, 86, 'a town on the other side of the river', 'شهری در آن سوی رودخانه', 'town -> toun', 'تَون = شهر، ریوَ= رود خانه', '2022-05-04 23:50:22', '2022-05-04 23:50:22'),
(12, 87, 'a picture is worth a thousand words', 'یک تصویر ارزش هزار کلمه است، (شنیدن کی بود مانند دیدن) یک تصویر بیشتر از هزار کلمه ارزش داره (منظور هزار بار گفتن) ، یک بار دیدن بهتر از هزار بار گفتن', NULL, NULL, '2022-05-05 00:00:13', '2022-05-05 00:00:13'),
(13, 87, 'jewelry worth $450 was taken', 'جواهراتی به ارزش 450 دلار گرفته شد.( جواهراتی که به ارزش 450 دلار بود، پس گرفته شد )', 'ˈjo͞o(ə)lrē = جوو اِل رری', 'ˈjo͞o(ə)lrē = جواهر فروشی،  taken = تیکن ، ت ای کن = گرفته شده، ماخوذ، اخذ شده', '2022-05-05 00:11:37', '2022-05-05 00:11:37'),
(14, 88, 'no hard feelings', 'بدون احساسات سخت ( آشتی آشتی )', NULL, NULL, '2022-05-05 00:17:17', '2022-05-05 00:17:17'),
(15, 89, 'you win some you lose some', 'مقداری برنده می شوی، مقداری می بازی ( زندگی بالا و پایین داره)', 'lose = باختن، از دست دادن', NULL, '2022-05-05 00:25:50', '2022-05-05 00:25:50'),
(16, 92, 'twice a week', 'دوبار در هفته', NULL, NULL, '2022-05-05 00:41:14', '2022-05-05 00:41:14'),
(17, 92, 'twice a day after meals', 'دو بار در روز بعد از غذا', NULL, NULL, '2022-05-05 00:42:16', '2022-05-05 00:42:16'),
(18, 92, 'twice daily', 'روزانه دوبار', NULL, NULL, '2022-05-05 00:44:36', '2022-05-05 00:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_type_id` bigint(20) UNSIGNED NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'استفاده در آدرس',
  `word` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mean` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'معنی',
  `pronounceEn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'تلفظ به انگلیسی',
  `pronounceFa` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'تلفظ به فارسی',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`id`, `lesson_type_id`, `link`, `word`, `mean`, `pronounceEn`, `pronounceFa`, `created_at`, `updated_at`) VALUES
(1, 1, 'tiptap', 'tiptap', NULL, NULL, NULL, '2022-03-06 04:30:04', '2022-03-06 04:30:04'),
(2, 1, 'is', 'is', NULL, NULL, NULL, '2022-03-06 04:30:27', '2022-03-06 04:30:27'),
(3, 1, 'a', 'a', NULL, NULL, NULL, '2022-03-06 04:34:46', '2022-03-06 04:34:46'),
(4, 1, 'headless', 'headless', NULL, NULL, NULL, '2022-03-06 04:35:09', '2022-03-06 04:35:09'),
(5, 1, 'wrapper', 'wrapper', NULL, NULL, NULL, '2022-03-06 04:35:20', '2022-03-06 04:35:20'),
(6, 1, 'around', 'around', NULL, NULL, NULL, '2022-03-06 04:35:31', '2022-03-06 04:35:31'),
(7, 1, 'ProseMirror', 'ProseMirror', NULL, NULL, NULL, '2022-03-06 04:35:43', '2022-03-06 04:35:43'),
(9, 1, 'a1', 'a .', NULL, NULL, NULL, '2022-03-06 04:37:43', '2022-03-06 04:37:43'),
(10, 1, 'toolkit', 'toolkit', NULL, NULL, NULL, '2022-03-06 04:38:08', '2022-03-06 04:38:08'),
(11, 1, 'for', 'for', NULL, NULL, NULL, '2022-03-06 04:38:21', '2022-03-06 04:38:21'),
(12, 1, 'building', 'building', NULL, NULL, NULL, '2022-03-06 04:38:31', '2022-03-06 04:38:31'),
(13, 1, 'rich', 'rich', NULL, NULL, NULL, '2022-03-06 04:38:41', '2022-03-06 04:38:41'),
(14, 1, 'text', 'text', NULL, NULL, NULL, '2022-03-06 04:38:51', '2022-03-06 04:38:51'),
(15, 1, 'WYSIWYG', 'WYSIWYG', NULL, NULL, NULL, '2022-03-06 04:39:00', '2022-03-06 04:39:00'),
(16, 1, 'editors', 'editors,', NULL, NULL, NULL, '2022-03-06 04:39:20', '2022-03-06 04:39:20'),
(17, 1, 'which', 'which', NULL, NULL, NULL, '2022-03-06 04:39:31', '2022-03-06 04:39:31'),
(18, 1, 'already', 'already', NULL, NULL, NULL, '2022-03-06 04:39:44', '2022-03-06 04:39:44'),
(19, 1, 'in', 'in', NULL, NULL, NULL, '2022-03-06 04:39:53', '2022-03-06 04:39:53'),
(20, 1, 'use', 'use', NULL, NULL, NULL, '2022-03-06 04:40:02', '2022-03-06 04:40:02'),
(21, 1, 'at', 'at', NULL, NULL, NULL, '2022-03-06 04:40:11', '2022-03-06 04:40:11'),
(22, 1, 'many', 'many', NULL, NULL, NULL, '2022-03-06 04:40:20', '2022-03-06 04:40:20'),
(23, 1, 'well-known', 'well-known', NULL, NULL, NULL, '2022-03-06 04:40:34', '2022-03-06 04:40:34'),
(24, 1, 'companies', 'companies', NULL, NULL, NULL, '2022-03-06 04:40:46', '2022-03-06 04:40:46'),
(25, 1, 'such', 'such', NULL, NULL, NULL, '2022-03-06 04:40:55', '2022-03-06 04:40:55'),
(26, 1, 'as', 'as', NULL, NULL, NULL, '2022-03-06 04:41:06', '2022-03-06 04:41:06'),
(27, 1, 'New', 'New', NULL, NULL, NULL, '2022-03-06 04:41:14', '2022-03-06 04:41:14'),
(28, 1, 'York', 'York', NULL, NULL, NULL, '2022-03-06 04:41:22', '2022-03-06 04:41:22'),
(29, 1, 'Times', 'Times', NULL, NULL, NULL, '2022-03-06 04:41:29', '2022-03-06 04:41:29'),
(30, 1, 'The', 'The', NULL, NULL, NULL, '2022-03-06 04:41:36', '2022-03-06 04:41:36'),
(31, 1, 'Guardian', 'Guardian', NULL, NULL, NULL, '2022-03-06 04:41:44', '2022-03-06 04:41:44'),
(32, 1, 'or', 'or', NULL, NULL, NULL, '2022-03-06 04:41:51', '2022-03-06 04:41:51'),
(33, 1, 'Atlassian', 'Atlassian', NULL, NULL, NULL, '2022-03-06 04:41:58', '2022-03-06 04:41:58'),
(34, 2, 'condolence', 'condolence', 'تسلیت، اظهار تاسف، همدردی، عزا', '/kənˈdoʊləns/', 'کِن دُوُ لِنس', '2022-03-12 04:20:46', '2022-03-12 04:20:46'),
(35, 2, 'sorry', 'sorry', 'غمگین، ناجور، پشیمان، بد بخت، متاسف، متاثر', '/ˈsɑːri/', 'ساری', '2022-03-12 04:33:19', '2022-03-12 04:33:19'),
(36, 2, 'loss', 'loss', 'گمراهی، ضلالت، عدم، فقدان، خسارت، زیان، ضرر، خدشه، خسران، مرگ، اتلاف، باخت، خسار', '/ˈlɒs/', 'لاس', '2022-03-12 04:35:00', '2022-03-12 04:35:00'),
(37, 2, 'sympathy', 'sympathy', 'عاطفه، عطف، علاقه، همدمی، دلسوزی، همدردی، همفکری، رقت', '/ˈsɪmpəθi/', 'سِم پِ سی', '2022-03-12 04:42:27', '2022-03-12 04:42:27'),
(38, 2, 'mourning', 'mourning', 'عزا، ماتم، سوگواری، عزاداری، سوگ', '/ˈmɔːrnɪŋ/', 'مارنینگ', '2022-03-12 04:44:13', '2022-03-12 04:44:13'),
(39, 2, 'rest', 'rest', 'سامان، استراحت، اسایش، نتیجه، باقی، باقی مانده،دیگران', '/ˈrest/', 'رَست', '2022-03-12 04:46:11', '2022-08-18 06:58:59'),
(40, 2, 'peace', 'peace', 'سازش، ارامش، اشتی، سلامت، سلامتی، صلح، صلح و صفا', 'pēs', 'پی ی س', '2022-03-12 04:46:48', '2022-08-18 07:00:54'),
(41, 2, 'mind', 'mind', 'خاطره، یاد، نظر (نظریات)،سامان، خیال، ضمیر، مشعر، خاطر، خرد، عقل، ذهن', '/ˈmaɪnd/', 'مایند', '2022-03-12 04:48:28', '2022-03-12 04:48:28'),
(42, 3, 'representational', 'representational', 'نمایندگی', 'reprəˌzenˈtāSH(ə)n(ə)l و /ˌreprəzənˈteɪʃənəl/', 'رِپ ریزِن تی شنال', '2022-03-12 06:47:11', '2022-03-12 06:47:11'),
(43, 3, 'state', 'state', 'چگونگی، حال، حالت، ایالت، استان', '/ˈsteɪt/', 'اس تی ت ( ای ایران)', '2022-03-12 07:11:20', '2022-08-18 07:04:23'),
(44, 3, 'transfer', 'transfer', 'واگذاری، انتقال، سند انتقال، تحویل، نقل، انتقالی، انتقال دادن،  بردن، جابجا کردن، ترا فرست کردن،', '/ˈtrænsfɜːr/', 'ترَنس فَ (ر)', '2022-03-12 07:12:55', '2022-08-18 07:06:15'),
(45, 3, 'interface', 'interface', 'رابط', 'ˈin(t)ərˌfās', 'اینتَ (ر) فِیس', '2022-03-12 07:24:44', '2022-08-18 07:11:55'),
(46, 4, 'json', 'json', NULL, NULL, 'جسون', '2022-03-13 02:15:25', '2022-03-13 02:15:25'),
(47, 4, 'object', 'object', 'هدف، شی', NULL, 'آبجَکت', '2022-03-13 02:17:08', '2022-03-13 02:17:08'),
(48, 4, 'Notation', 'notation', 'نشانه گذاری، حاشیه نویسی، بخاطرسپاری، توجه، یادداشت، ثبت', 'nōˈtāSH(ə)n', 'نوو تی ی شِن (ری)', '2022-03-13 02:19:39', '2022-08-18 07:15:52'),
(49, 4, 'resource', 'resource', 'منبع، منابع، ابتکار، کاردانی', 'ˈrēˌsôrs', 'ری زورس', '2022-03-13 02:22:01', '2022-08-18 07:27:48'),
(50, 4, 'result', 'result', 'اثر، نتیجه، دست اورد، پی امد، بر امد، حاصل، منتج شدن، نتیجه دادن، منجر شدن', '/rəˈzəlt/', NULL, '2022-03-13 02:41:54', '2022-03-13 02:41:54'),
(51, 4, 'except', 'except', 'مگر، جز، باستثنای، بجز، سوای، غیر، غیر از', '/ɪkˈsept/', 'ایک سَپت', '2022-03-13 02:42:57', '2022-03-13 02:42:57'),
(52, 4, 'flag', 'flag', 'پرچم', '/ˈflæɡ/', NULL, '2022-03-13 10:03:21', '2022-03-13 10:03:21'),
(53, 4, 'self', 'self', 'خود', '/ˈself/', NULL, '2022-03-16 00:43:30', '2022-03-16 00:43:30'),
(54, 4, 'describe', 'describe', 'توصیف کردن', 'dəˈskrīb', 'دِس کرایب', '2022-03-16 00:45:15', '2022-03-16 00:45:15'),
(55, 4, 'describing', 'describing', 'توصیف می کند', NULL, 'دِس کرایبین (گ)', '2022-03-16 00:47:42', '2022-03-16 00:47:42'),
(56, 4, 'self-describing', 'self-describing', 'خود توصیف کننده', NULL, NULL, '2022-03-16 00:48:38', '2022-03-16 00:48:38'),
(57, 4, 'extensible', 'extensible', 'قابل توسعه، قابل تمدید، توسعه پذیر، قابل تعمیم، منبسط شدنی', NULL, 'اکس تِن سی بُل', '2022-03-16 00:52:48', '2022-03-16 00:52:48'),
(58, 4, 'parse', 'parse', 'تجزیه کردن، تجزیه شدن، جمله را تجزیه کردن', '/ˈpɑːrs/', NULL, '2022-03-16 01:58:05', '2022-03-16 01:58:05'),
(59, 4, 'json-parse', 'json.parse()', 'تبدیل رشته به json در js', NULL, NULL, '2022-03-16 01:59:54', '2022-03-16 01:59:54'),
(60, 4, 'stringify', 'stringify', 'رشته کردن', NULL, 'استرینگی فای', '2022-03-16 02:01:18', '2022-03-16 02:01:18'),
(61, 4, 'json-stringify', 'json.stringify()', 'json را به رشته تبدیل می‌کند در js', NULL, NULL, '2022-03-16 02:02:41', '2022-03-16 02:02:41'),
(62, 5, 'prototype', 'prototype', 'نمونه اولیه', 'prōdəˌtīp', 'پُرتِ تایپ', '2022-03-21 00:48:41', '2022-03-21 00:48:41'),
(63, 5, 'property', 'property', 'ویژگی', 'ˈpräpərdē', NULL, '2022-03-21 01:16:09', '2022-03-21 01:16:09'),
(64, 6, 'gateway', 'gateway', 'دروازه', 'ˈɡātˌwā', 'گی..ت وی', '2022-03-23 02:29:18', '2022-03-23 02:29:18'),
(65, 6, 'topology', 'topology', 'توپولوژی، مکان شناسی، وضعیت جغرافیایی، در کامپیوتر معماری شبکه و نوع چیدمان', 'təˈpäləjē', 'تِ پآ لِ جی', '2022-03-23 02:34:42', '2022-03-23 02:34:42'),
(66, 7, 'grid', 'grid', 'توری،', 'grid', 'گِ رِ د', '2022-03-26 02:37:31', '2022-03-26 02:37:31'),
(67, 7, 'gap', 'gap', 'شکاف، در grid فاصله بین سلولها', 'ɡap', 'گَپ', '2022-03-26 02:38:57', '2022-03-26 02:38:57'),
(68, 7, 'column', 'column', 'ستون', 'käləm', 'کالِم', '2022-03-26 02:42:13', '2022-03-26 02:42:13'),
(69, 8, 'general', 'general', 'عمومی', 'ˈjen(ə)rəl', 'ژِ نِرآل', '2022-04-15 02:08:51', '2022-04-15 02:12:30'),
(70, 8, 'typically', 'typically', 'معمولا', 'ˈtipik(ə)lē', 'تیپی کِلی', '2022-04-15 02:10:23', '2022-04-15 02:10:23'),
(71, 8, 'interest', 'interest', 'علاقه', 'ˈint(ə)rəst', 'این تِرِست', '2022-04-15 02:17:03', '2022-04-15 02:17:03'),
(72, 8, 'wanting', 'wanting', 'خواستن', 'ˈwän(t)iNG', 'وان تین گ', '2022-04-15 02:25:13', '2022-04-15 02:25:13'),
(73, 8, 'lacking', 'lacking', 'فاقد', 'ˈlakiNG', 'لاکین گ', '2022-04-15 02:34:24', '2022-04-15 02:34:24'),
(74, 8, 'certain', 'certain', 'مسلم - قطعی', 'ˈsərtn', 'سِرتِن', '2022-04-15 02:36:56', '2022-04-15 02:36:56'),
(75, 8, 'necessary', 'necessary', 'لازم، لازم است', 'ˈnesəˌserē', 'نِسِ سِرِی--', '2022-04-15 02:39:36', '2022-04-15 02:39:36'),
(76, 8, 'required', 'required', 'ضروری، واجب', 'rəˈkwī(ə)rd', 'رکوایرد', '2022-04-15 02:41:54', '2022-04-15 02:41:54'),
(77, 8, 'quality', 'quality', 'کیفیت', 'ˈkwälədē', 'کوآلِتی', '2022-04-15 02:44:42', '2022-04-15 02:46:09'),
(78, 8, 'excellence', 'excellence', 'تعالی، ممتاز، رجحان، برتری', 'ˈeks(ə)ləns', 'اکس سِلنز', '2022-04-15 02:53:34', '2022-04-15 02:53:34'),
(79, 6, 'explore', 'explore', 'کاوش', 'ikˈsplôr', 'اکس پِل و', '2022-04-16 01:29:10', '2022-04-16 01:29:10'),
(80, 6, 'fluency', 'fluency', 'سلیس، روان، شیوایی', 'ˈflo͞oənsē', 'فِلووو اِنسی', '2022-04-16 01:34:17', '2022-04-16 01:34:17'),
(81, 6, 'interpret', 'interpret', 'تفسیر', 'inˈtərprət', 'اینتِ ر پت', '2022-04-16 01:42:26', '2022-04-16 01:42:26'),
(82, 6, 'practice', 'practice', 'تمرین', 'ˈpraktəs', 'پرَکتس', '2022-04-16 01:56:20', '2022-04-16 01:56:20'),
(83, 6, 'exercise', 'exercise', 'ورزش، تمرین، ممارست', 'ˈeksərˌsīz', 'اِکسِر سایز', '2022-04-16 02:01:27', '2022-04-16 02:01:27'),
(84, 9, 'said', 'said', 'گفت', 'sed', 'سد', '2022-05-04 23:29:15', '2022-05-04 23:29:15'),
(85, 9, 'live', 'live', 'زنده، زندگی کردن', 'liv', 'لایو', '2022-05-04 23:33:22', '2022-05-04 23:33:22'),
(86, 9, 'side', 'side', 'سمت، طرف، کناره، پهلو، ضلع، طرفداری کردن', 'sīd', 'ساید', '2022-05-04 23:44:10', '2022-05-04 23:44:10'),
(87, 9, 'worth', 'worth', 'ارزش، با ارزش، ثروت، بها، قیمت', 'wərTH', 'ووَرس', '2022-05-04 23:56:40', '2022-05-05 00:01:22'),
(88, 9, 'feeling', 'feeling', 'احساس، حس', 'ˈfēliNG', NULL, '2022-05-05 00:15:13', '2022-05-05 00:15:13'),
(89, 9, 'win', 'win', 'پیروزی، برد، بدست آوردن، پیروز شدن', 'win', 'ووِن', '2022-05-05 00:22:38', '2022-05-05 00:22:38'),
(90, 9, 'lose', 'lose', 'از دست دادن، باختن، تلف کردن، مفقود شدن، شکستن', 'lo͞oz', 'لِ وووز', '2022-05-05 00:28:32', '2022-05-05 00:28:32'),
(91, 9, 'measure', 'measure', 'اندازه گرفتن، اندازه، مقدار، میزان، پیمانه', 'ˈmeZHər', 'مِ ژَ ر', '2022-05-05 00:35:52', '2022-05-05 00:35:52'),
(92, 9, 'twice', 'twice', 'دوبار، دو برابر، دو مرتبه، دو دفعه', 'twīs', 'تو آاایس', '2022-05-05 00:40:16', '2022-05-05 00:40:16'),
(93, 10, 'software', 'software', 'نرم افزار', 'sôf(t)wer', 'سافت و(ر)', '2022-05-05 01:26:15', '2022-05-05 01:26:15'),
(94, 10, 'continue', 'continue', 'ادامه دادن، در داخله حلقه ها یعنی بقیه دستورات را نادیده بگیر و دوباره از نو', 'kənˈtinyo͞o', 'کِن تی نیوو', '2022-05-05 01:28:47', '2022-05-05 01:28:47'),
(95, 10, 'break', 'break', 'شکستن، زنگ تفریح، وقفه، شکاف،', 'brāk', 'بِ ر (ای) ک', '2022-05-05 01:31:01', '2022-05-05 01:32:27'),
(96, 10, 'switch', 'switch', 'تعویض، کلید، گزینه', 'swiCH', 'سواچ', '2022-05-05 01:36:23', '2022-05-05 01:36:23'),
(97, 10, 'case', 'case', 'مورد، جعبه، محفظه، پرونده', 'kās', 'کیس', '2022-05-05 01:37:48', '2022-05-05 01:37:48'),
(98, 10, 'expression', 'expression', 'عبارت، بیان، ابراز، تجلی، حالت، قیافه، کلمه بندی', 'ikˈspreSHən', 'اکس پِرِ شن', '2022-05-05 01:40:25', '2022-05-05 01:40:25'),
(99, 10, 'condition', 'condition', 'شرط، شرایط، وضعیت، حالت، روزگار، شرط نمودن، شایسته کردن، مقید کردن', 'kənˈdiSH(ə)n', 'کِن دی شِن', '2022-05-05 03:14:50', '2022-05-05 03:14:50'),
(100, 12, 'various', 'various', 'مختلف، گوناگون، چندین، جورواجور، متنوع', 'ˈverēəs', 'وری.. اِس', '2022-05-16 01:05:41', '2022-05-16 01:05:41'),
(101, 12, 'several', 'several', 'چندین، چند، مختلف، جدا، برخی از', 'ˈsev(ə)rəl', 'سِو راُل', '2022-05-16 01:09:27', '2022-05-16 01:09:27'),
(102, 12, 'primitive', 'primitive', 'اولیه، بدوی، پیشین، اصلی، قدیم، انسان اولیه', 'ˈprimədiv', 'پِری مِ تیو', '2022-05-16 01:13:07', '2022-05-16 01:13:07'),
(103, 12, 'existing', 'existing', 'موجود،', 'iɡˈzistiNG', 'اِگ زیستین گ', '2022-05-16 23:18:41', '2022-05-16 23:18:41'),
(104, 12, 'declaration', 'declaration', 'اعلام، اعلامیه، بیان، عرضه، عرضه داشت', 'ˌdekləˈrāSH(ə)n', 'دِکّلِ ریشن', '2022-05-16 23:21:02', '2022-05-16 23:21:48'),
(105, 12, 'season', 'season', 'فصل، دوران، هنگام، چاشنی زدن، ادویه زدن', 'ˈsēzən', 'سی ی زِن', '2022-05-16 23:23:25', '2022-05-16 23:23:25'),
(106, 12, 'enumerate', 'enumerate', 'برشمردن، شمردن، یکایک شمردن، به شمار آرودن، محسوب داشتن', 'əˈn(y)o͞oməˌrāt', 'اِ نیو مِرِیت', '2022-05-16 23:28:20', '2022-05-16 23:28:20'),
(107, 12, 'composed', 'composed', 'تشکیل شده، مرکب، ترکیب شده، آرام، خونسرد، منصف', 'kəmˈpōzd', 'کِم پاَوزد', '2022-05-16 23:33:48', '2022-05-16 23:33:48'),
(108, 12, 'letter', 'letter', 'حرف، نویسه، حروف الفبا، نامه، کاغذ، عریضه، ادبیات', 'ˈledər', 'لَ تَ ر', '2022-05-16 23:36:54', '2022-05-16 23:36:54'),
(109, 12, 'digit', 'digit', 'رقم، عدد، انگشت، پیکر', 'ˈdijit', 'دیجیت', '2022-05-16 23:38:52', '2022-05-16 23:38:52'),
(110, 12, 'distinct', 'distinct', 'متمایز، مجزا، متفاوت، واضح، روشن', 'dəˈstiNG(k)t', 'دِس تینگت', '2022-05-16 23:41:41', '2022-05-16 23:41:41'),
(111, 12, 'sensitive', 'sensitive', 'حساس، دارای حساسیت، نفوذپذیز', 'ˈsensədiv', 'سِن ستیو', '2022-05-17 00:08:39', '2022-05-17 00:08:39'),
(112, 12, 'structure', 'structure', 'ساختار، ساخت، ساختمان، سازمان، ترکیب، بنا، تشکیل دادن', 'ˈstrək(t)SHər', 'استراک چر', '2022-05-17 00:10:55', '2022-05-17 00:10:55'),
(113, 12, 'extern', 'extern', 'خارجی، بیرونی، ظاهری، واقع در خارج', 'ˈekstərn', 'اکس ترن', '2022-05-17 00:12:36', '2022-05-17 00:12:36'),
(114, 13, 'initial', 'initial', 'اولیه، نخستین، ابتدایی، اصلی، آغاز کردن', 'iˈniSHəl', 'انی شآل', '2022-05-21 00:03:29', '2022-05-21 00:03:29'),
(115, 13, 'scale', 'scale', 'مقیاس، ترازو، معیار، گام، درجه، وزن، تناسب، نسبت', 'skāl', 'اس کیل', '2022-05-21 00:06:05', '2022-05-21 00:06:05'),
(116, 13, 'viewport', 'viewport', 'درگاه دید، صفحه نمایش', 'ˈvyo͞oˌpôrt', 'ویو پورت', '2022-05-21 00:07:35', '2022-05-21 00:07:35'),
(117, 13, 'distribute', 'distribute', 'توزیع کردن، پخش کردن، تقسیم کردن، تعمیم دادن', 'dəˈstribyo͞ot', 'دستری بیوت', '2022-05-21 00:09:28', '2022-05-21 00:09:28'),
(118, 13, 'subject', 'subject', 'موضوع، در معرض، تحت، فاعل، شخص، مطلب،نهاد، مشمول، مطیع', NULL, 'ساب جَکت', '2022-05-21 00:12:58', '2022-05-21 00:12:58'),
(119, 13, 'obtain', 'obtain', 'بدست آوردن، گرفتن، فراهم کردن، حاصل کردن', 'əbˈtān', 'اُب تاَین', '2022-05-21 00:16:46', '2022-05-21 00:16:46'),
(120, 13, 'speech', 'speech', 'سخن، گفتار، سخنرانی، صحبت، خطبه، حرف', 'spēCH', 'اس پیچ', '2022-05-21 00:19:14', '2022-05-21 00:19:14'),
(121, 13, 'condition', 'condition', 'شرایط، شرط، حال، حالت، روزگار، چگونگی، شایسته کردن، مقید کردن، شرط نمودن', 'kənˈdiSH(ə)n', 'کِن دِی شن', '2022-05-21 00:21:59', '2022-05-21 00:21:59'),
(122, 13, 'aspect', 'aspect', 'جنبه، وضع، نمود، صورت، سیما', 'ˈaspekt', 'اَسپکت', '2022-05-21 00:24:59', '2022-05-21 00:24:59'),
(123, 13, 'ratio', 'ratio', 'نسبت، ضریب، نسبیت، نسبت معین و ثابت، قسمت، ضرب کننده', 'ˈrāSHēˌō', 'ری شی اَو', '2022-05-21 00:27:47', '2022-05-21 00:27:47'),
(124, 13, 'aspect-ratio', 'aspect-ratio', 'نسبت تصویر', 'ˈaˌspekt ˈrāSHō', 'اَسپکت ری شی اَو', '2022-05-21 00:29:28', '2022-05-21 00:29:28'),
(125, 13, 'orientation', 'orientation', 'گرایش، جهت، جهت یابی، توجه به سوی خاور، آشناسازی، آشنایی، راهنمایی', 'ˌôrēənˈtāSH(ə)n', 'اورین تی شِن', '2022-05-21 00:32:40', '2022-05-21 00:32:40'),
(126, 13, 'media', 'media', 'رسانه ها', 'ˈmēdēə', 'می دیا', '2022-05-21 00:34:29', '2022-05-21 00:34:29'),
(127, 13, 'sheet', 'sheet', 'ورق، ورقه، صفحه، ملافه، تخته، لت، ملافه کردن، ورقه کردن، ورق شدن', 'SHēt', 'شیت', '2022-05-21 00:36:48', '2022-05-21 00:36:48'),
(128, 13, 'monochrome', 'monochrome', 'تک رنگ', 'ˈmänəˌkrōm', 'مانه کِرُم', '2022-05-21 00:39:31', '2022-05-21 00:39:31'),
(129, 13, 'definitive', 'definitive', 'قطعی، نهایی، قاطع، صریح، معین کننده', 'dəˈfinədiv', 'دیفینی تیو', '2022-05-21 02:41:56', '2022-05-21 02:41:56'),
(130, 13, 'embedded', 'embedded', 'تعبیه شده است، جاسازی شده', 'embedded', 'ایم بَدد', '2022-05-21 02:43:32', '2022-05-21 02:43:32'),
(131, 13, 'stylesheet', 'stylesheet', 'شیوه نامه', NULL, 'استایل شیت', '2022-05-21 02:45:01', '2022-05-21 02:45:01'),
(132, 13, 'projection', 'projection', 'طرح ریزی، پروژه، تصویر، طرح، تجسم، پرتاب، افکشن', 'prəˈjekSH', 'پِرِ جَک شن', '2022-05-21 02:47:45', '2022-05-21 02:47:45'),
(133, 13, 'agent', 'agent', 'عامل، نماینده، مامور، وکیل، گماشته، پیشکار', 'ˈājənt', 'ای جنت', '2022-05-21 02:49:17', '2022-05-21 02:49:17'),
(134, 13, 'URL', 'URL', 'uniform resource locator ، مکان یاب منبع یکنواخت، مکان یا آدرسی که در آن اسناد را می توان در اینترنت پیدا کرد.', NULL, NULL, '2022-05-21 02:54:40', '2022-05-21 02:54:40'),
(135, 13, 'locator', 'locator', 'مکان یاب، اجاره دهنده، جایگزین شونده', 'ˈlōˌkādər', 'لو کَی تِ ر', '2022-05-21 02:57:11', '2022-05-21 02:57:11'),
(136, 14, 'Statement', 'Statement', 'شرح، اعلامیه، اظهار، حکم، بیانیه، بیان، توضیح، عرضه داشت، تقریر، گفته، قطعنامه، قطعه نامه', '/ˈsteɪtmənt/', 'استیت مِنت', '2022-07-01 23:49:12', '2022-07-01 23:49:12'),
(137, 14, 'select', 'select', 'انتخاب کردن، برگزیدن، جداکردن', 'səˈlekt', 'سلکت', '2022-07-01 23:54:51', '2022-07-01 23:54:51'),
(138, 14, 'from', 'from', 'از، ازجانب، ، در نتیجه، بواسطه، از پیش', 'frəm', 'فرآم', '2022-07-02 00:00:42', '2022-07-02 00:00:42'),
(139, 14, 'Column', 'Column', 'ستون، عمود، پایه', '/ˈkɑːləm/', 'کالم', '2022-07-02 00:04:12', '2022-07-02 00:04:12'),
(140, 14, 'table', 'table', 'جدول، میز، فهرست، لیست', 'ˈtābəl', 'تیبُل', '2022-07-02 00:06:19', '2022-07-02 00:06:19'),
(141, 14, 'distinct', 'distinct', 'متمایز، مجزا، متفاوت،روشن، واضح', 'dəˈstiNG(k)t', 'دستینگت', '2022-07-02 00:09:37', '2022-07-02 00:09:37'),
(142, 14, 'COUNT', 'count', 'شمردن، حساب کردن، شمار، پنداشتن', 'kount', 'کاُنت', '2022-07-02 00:15:47', '2022-07-05 00:05:11'),
(143, 14, 'exercise', 'exercise', 'تمرین، ورزش، مشق، تمرین کردن، ورزش کردن', 'ˈeksərˌsīz', 'اِکسِ(ر)سایز', '2022-07-02 00:18:51', '2022-07-02 00:18:51'),
(144, 14, 'where', 'where', 'جایی که، کجا', '(h)wer', 'وِر', '2022-07-02 02:13:34', '2022-07-02 02:13:34'),
(145, 14, 'condition', 'condition', 'شرط، وضعیت، حالت، شرط نمودن، مقید کردن', 'kənˈdiSH(ə)n', 'کِن دی شن', '2022-07-02 02:31:18', '2022-07-02 02:31:18'),
(146, 14, 'equal', 'equal', 'برابر، مساوی، یکسان(=)', 'ˈēkwəl', 'اِیی کواِل (=)', '2022-07-02 02:41:26', '2022-07-02 02:42:17'),
(147, 14, 'GreaterThan', 'greaterThan', 'بزرگتر از (<)', NULL, 'گِریتِر زن', '2022-07-02 02:47:05', '2022-07-02 02:47:05'),
(148, 14, 'Lessthan', 'LessThan', 'کمتر از (>)', NULL, 'لِس زن', '2022-07-02 02:51:05', '2022-07-02 02:51:05'),
(149, 14, 'GreaterThanOrEqual', 'greaterThanOrEqual', 'بزرگتر یا مساوی (=<)', NULL, NULL, '2022-07-02 02:53:07', '2022-07-02 02:53:07'),
(150, 14, 'LessThanOrEqual', 'LessThanOrEqual', 'کمتر یا مساوی (=>)', NULL, NULL, '2022-07-02 02:54:09', '2022-07-02 02:54:09'),
(151, 14, 'notEqual', 'notEqual', 'نا برابر ( =! و <>)', NULL, NULL, '2022-07-02 02:56:02', '2022-07-02 02:56:02'),
(152, 14, 'between', 'between', 'بین، میان، در میان، مابین', 'bəˈtwēn', 'بت وین', '2022-07-02 03:31:08', '2022-07-02 03:31:08'),
(153, 14, 'certain', 'certain', 'معین، مسلم، خاص، قطعی، معلوم', 'ˈsərtn', 'سِ(ر) تِن', '2022-07-02 03:35:17', '2022-07-02 03:35:17'),
(154, 14, 'range', 'range', 'محدوده، حدود، دامنه، برد، حوزه، رسایی', 'rānj', 'ری نج (بر وزن شهر ری)', '2022-07-02 03:38:03', '2022-07-02 03:38:03'),
(155, 14, 'like', 'like', 'شبیه، مانند، همچون، قرین، هم شکل، پسندیدن', 'līk', 'لآیک', '2022-07-02 03:40:24', '2022-07-02 03:40:24'),
(156, 14, 'pattern', 'pattern', 'الگو، مدل، طرح، نقش، سر مشق', 'ˈpadərn', 'پَ تِ(ر)ن', '2022-07-02 03:45:47', '2022-07-02 03:45:47'),
(157, 14, 'specify', 'specify', 'مشخص کردن، تعیین کردن، معین کردن، ذکر کردن، تصریح نمودن', 'ˈspesəˌfī', 'اسپِ سفآی', '2022-07-02 03:56:24', '2022-07-02 03:56:24'),
(158, 14, 'possible', 'possible', 'ممکن، محتمل، امکان پذیر، ممکن است، مقدور، شدنی', 'ˈpäsəb(ə)l', 'پاسِ بُل', '2022-07-02 04:00:10', '2022-07-02 04:00:10'),
(159, 15, 'below', 'below', 'زیر، پایین', 'bəˈlō', 'بِلَو', '2022-07-26 09:44:41', '2022-08-13 00:39:58'),
(160, 15, 'above', 'above', 'بالا، فوق، بالاتر', 'əˈbəv', 'اِ بَ و (وِ)', '2022-07-26 09:45:41', '2022-08-13 00:44:55'),
(161, 15, 'actually', 'actually', 'واقعا، در حقیقت، فعلا', 'ˈak(t)SH(o͞o)əlē', 'اَک(ت) شِلی', '2022-07-26 09:47:02', '2022-08-13 00:47:15'),
(162, 15, 'perform', 'perform', 'انجام دادن، انجام کردن، بجا آوردن، کردن، ایفا کردن، بازی کردن', NULL, 'پِ(ر)فُ(ر)م', '2022-07-26 09:48:51', '2022-08-13 00:48:40'),
(163, 15, 'occur', 'occur', 'روی دادن، اتفاق افتادن، رخ دادن', 'əˈkər', 'اِ کَر', '2022-07-26 09:50:06', '2022-08-13 00:49:32'),
(164, 15, 'tip', 'tip', 'نکته، سر، راس، سرقلم، نوک', 'tip', 'تِپّ', '2022-07-26 09:51:20', '2022-08-13 00:52:41'),
(165, 15, 'alias', 'alias', 'نام مستعار', 'ˈālēəs', NULL, '2022-07-26 09:52:21', '2022-07-26 09:52:21'),
(166, 15, 'specific', 'specific', 'خاص، ویژه، مخصوص، خصوصی', 'spəˈsifik', 'اِسپِ سِیفِک', '2022-07-26 09:53:39', '2022-08-13 00:55:06'),
(167, 15, 'instead', 'instead', 'بجای، در عوض', 'inˈsted', 'این استِد', '2022-07-26 09:54:34', '2022-08-13 00:58:22'),
(168, 15, 'possible', 'possible', 'ممکن، امکان پذیر', 'ˈpäsəb(ə)l', 'پآس اِبل', '2022-07-26 09:56:34', '2022-08-13 00:59:47'),
(169, 15, 'expect', 'expect', 'انتظار، منتظر بودن، چشم داشتن', 'ikˈspekt', 'اِکس پِکت', '2022-07-26 09:57:29', '2022-08-13 01:00:37'),
(170, 15, 'omit', 'omit', 'حذف کردن، از قلم انداختن', 'əˈmit', 'اِ مِت', '2022-07-26 09:59:02', '2022-08-13 01:01:33'),
(171, 15, 'omitting', 'omitting', 'حذف کردن، انداختن', NULL, 'اِمِ تینگ', '2022-07-26 10:00:10', '2022-08-13 01:02:25'),
(172, 15, 'math', 'math', 'ریاضی', NULL, 'مَث', '2022-07-26 10:00:42', '2022-08-13 01:03:01'),
(173, 15, 'comparison', 'comparison', 'مقایسه، سنجش، مطابقت، تطبیق، برابری، مقابله', 'kəmˈperəsən', 'کِم پَ رِسِن', '2022-07-26 10:02:29', '2022-08-13 01:05:03'),
(174, 15, 'condition', 'condition', 'شرط، وضعیت، حالت، شرط نمودن، مقید کردن، شایسته کردن', 'kənˈdiSH(ə)n', 'کِن دِیشِن', '2022-07-26 10:03:51', '2022-08-13 01:06:39'),
(175, 15, 'decision', 'decision', 'تصمیم، عزم، داوری، تصمیم گیری', 'dəˈsiZHən', 'دِ سی شِن', '2022-07-26 10:05:12', '2022-08-13 01:07:42'),
(176, 15, 'execute', 'execute', 'اجرا کردن', 'ˈeksəˌkyo͞ot', 'اِکسِ کی یُت', '2022-07-26 10:06:14', '2022-08-13 01:09:37'),
(177, 15, 'since', 'since', 'چون، چون که، از آنجا که، پس از، از وقتی که', 'sins', 'سینس', '2022-07-26 10:08:02', '2022-08-13 01:10:25'),
(178, 15, 'ternary', 'ternary', 'سه تایی', 'ˈtərnərē', 'تِ(ر) نِری', '2022-07-26 10:09:10', '2022-08-13 01:11:29'),
(179, 15, 'evaluate', 'evaluate', 'سنجیدن، ارزیابی کردن', 'əˈvalyəˌwāt', 'اِوَلیُ وِیت', '2022-07-26 10:10:24', '2022-08-13 01:13:43'),
(180, 15, 'associated', 'associated', 'مرتبط است', 'əˈsōsēˌādid', 'اِ سُ سی اِی تِد (ای ایران)', '2022-07-26 10:12:00', '2022-08-13 01:16:14'),
(181, 15, 'chapter', 'chapter', 'فصل، باب، قسمت، شعبه', 'ˈCHaptər', 'چَپ تِ(ر)', '2022-07-26 10:13:05', '2022-08-13 01:17:08'),
(182, 15, 'reach', 'reach', 'رسیدن', 'rēCH', 'ری ی چِ', '2022-07-26 10:13:40', '2022-08-13 01:19:13'),
(183, 16, 'performance', 'performance', 'کارایی، اجرا، انجام', 'pərˈfôrməns', 'پِ ر فورمِنس', '2022-07-29 01:42:22', '2022-07-29 01:42:22'),
(184, 16, 'ability', 'ability', 'توانایی، قابلیت، شایستگی', 'əˈbilədē', 'اِ بی لیتی', '2022-07-29 01:44:16', '2022-07-29 01:44:16'),
(185, 16, 'improve', 'improve', 'بهتر کردن، اصلاح کردن، بهبودی دادن', 'imˈpro͞ov', 'اِیم پِرُووِ', '2022-07-29 01:50:23', '2022-07-29 01:50:23'),
(186, 16, 'stand', 'stand', 'پایه،موضع، ایستگاه، ایستادن، بودن', 'stand', 'اِستَند', '2022-07-29 01:51:23', '2022-07-29 01:51:23'),
(187, 16, 'standOutFrom', 'standOutFrom', 'متمایز شدن از..', NULL, NULL, '2022-07-29 01:52:43', '2022-07-29 01:52:43'),
(188, 16, 'important', 'important', 'مهم', 'imˈpôrtnt', 'اِم پُرتِنت', '2022-07-29 01:54:34', '2022-07-29 01:54:34'),
(189, 16, 'manipulate', 'manipulate', 'دستکاری کردن، اداره کردن، با استادی درست کردن', 'məˈnipyəˌlāt', 'مِنی پی لِیت', '2022-07-29 01:57:32', '2022-07-29 01:57:32'),
(190, 16, 'same', 'same', 'یکسان، همان، شبیه، همان کار، همان چیز، همان جور', 'sām', 'سیم  بر وزن گیم (بازی)', '2022-07-29 02:01:31', '2022-07-29 02:01:31'),
(191, 16, 'reduce', 'reduce', 'کاستن، کم کردن، تقلیل دادن، ساده کردن، خرد کردن', 'rəˈd(y)o͞os', 'ری دیووس', '2022-07-29 02:04:52', '2022-07-29 02:04:52'),
(192, 16, 'handy', 'handy', 'دستی، سودمند', 'ˈhandē', 'هَندی', '2022-07-29 02:06:54', '2022-07-29 02:06:54'),
(193, 16, 'readable', 'readable', 'قابل خواند، خوانا، خواندنی', 'ˈrēdəb(ə)l', 'رید اِبُل', '2022-07-29 02:09:01', '2022-07-29 02:09:01'),
(194, 16, 'through', 'through', 'از طریق، از میان، بواسطه', 'THro͞o', 'ثراُوو', '2022-07-29 02:12:31', '2022-07-29 02:12:31'),
(195, 16, 'variant', 'variant', 'گوناگون، گونه، مختلف', 'ˈverēənt', 'وِ ری اِنت', '2022-07-29 02:14:14', '2022-07-29 02:14:14'),
(196, 16, 'increase', 'increase', 'افزایش، رشد، توسعه، افزودن، افزایش دادن،', NULL, 'این کِریس', '2022-07-29 02:16:32', '2022-07-29 02:16:32'),
(197, 16, 'otherwise', 'otherwise', 'در غیر این صورت، وگرنه،', 'ˈəT͟Hərˌwīz', 'اوزِر وایز', '2022-07-29 02:18:45', '2022-07-29 02:18:45'),
(198, 16, 'exactly', 'exactly', 'دقیقا، کاملا، عینا، بدرستی', 'iɡˈzak(t)lē', 'اِیگ زَکت لی', '2022-07-29 02:21:11', '2022-07-29 02:21:11'),
(199, 16, 'jump', 'jump', 'پرش، جهش، پریدن', 'jəmp', 'جَمپ', '2022-07-29 02:22:31', '2022-07-29 02:23:06'),
(200, 16, 'refer', 'refer', 'مراجعه کردن، رجوع کردن به...', 'rəˈfər', 'ری فَ (ر)', '2022-07-29 02:25:32', '2022-07-29 02:25:32'),
(201, 16, 'reference', 'reference', 'مرجع', 'ref(ə)rəns', 'رِفَ رنس', '2022-07-29 02:27:16', '2022-07-29 02:27:16'),
(202, 16, 'completely', 'completely', 'کاملا، به صورت کامل، سرتاسر', 'kəmˈplētlē', 'کِم پیلی تیلی', '2022-07-29 03:19:32', '2022-07-29 03:19:32'),
(203, 16, 'fine', 'fine', 'خوب', 'fīn', 'فآین', '2022-07-29 03:20:15', '2022-07-29 03:20:15'),
(204, 16, 'reserve', 'reserve', 'ذخیره، اندوخته، ذخیره کردن', 'rəˈzərv', 'ریی زررو', '2022-07-29 03:21:49', '2022-07-29 03:21:49'),
(205, 16, 'dimensional', 'dimensional', 'بُعدی', 'dəˈmen(t)SH(ə)nəl', 'دای مِن شِ نُل', '2022-07-29 03:23:57', '2022-07-29 03:23:57'),
(206, 16, 'dimensionality', 'dimensionality', 'ابعاد', NULL, 'دای مِن شنالتی', '2022-07-29 03:24:46', '2022-07-29 03:24:46'),
(207, 16, 'keep', 'keep', 'نگاه داشتن، حفظ کردن، ادامه دادن، اداره کردن، نگهداری، توجه، حفاظت', 'kēp', 'کییپ', '2022-07-29 03:26:21', '2022-07-29 03:26:21'),
(208, 16, 'turn', 'turn', 'نوبت، چرخش، دور زدن،', 'tərn', 'تِرن', '2022-07-29 03:28:25', '2022-07-29 03:28:25'),
(209, 16, 'member', 'member', 'عضو، بخش، جز، کارمند، شعبه', 'ˈmembər', 'ممبَ (ر)', '2022-07-29 03:30:56', '2022-07-29 03:30:56'),
(210, 16, 'giving', 'giving', 'دادن', 'ˈɡiviNG', 'گییویینگ', '2022-07-29 03:32:10', '2022-07-29 03:32:10'),
(211, 16, 'pervious', 'pervious', 'گذشته', 'ˈpərvēəs', 'پِر وی اِس', '2022-07-29 03:34:21', '2022-07-29 03:34:21'),
(212, 17, 'confusing', 'confusing', NULL, NULL, NULL, '2022-07-29 14:58:36', '2022-07-29 14:58:36'),
(213, 17, 'act', 'act', NULL, NULL, NULL, '2022-07-29 15:00:11', '2022-07-29 15:00:11'),
(214, 17, 'dereference', 'dereference', NULL, 'dēˌrefərəns', NULL, '2022-07-29 15:01:01', '2022-07-29 15:01:01'),
(215, 17, 'modify', 'modify', NULL, 'ˈmädəˌfī', NULL, '2022-07-29 23:26:08', '2022-07-29 23:26:08'),
(216, 17, 'known', 'known', NULL, 'nōn', NULL, '2022-07-29 23:34:11', '2022-07-29 23:34:11'),
(217, 17, 'immediately', 'immediately', NULL, 'iˈmēdēətlē', NULL, '2022-07-30 00:32:43', '2022-07-30 00:32:43'),
(218, 17, 'parenthesis', 'parenthesis', NULL, 'pəˈrenTHəsəs', NULL, '2022-07-30 00:36:49', '2022-07-30 00:36:49'),
(219, 17, 'multiple', 'multiple', NULL, 'ˈməltəpəl', NULL, '2022-07-30 00:40:48', '2022-07-30 00:40:48'),
(220, 17, 'consist', 'consist', NULL, NULL, NULL, '2022-07-30 00:43:42', '2022-07-30 00:43:42'),
(221, 17, 'client', 'client', NULL, 'ˈklīənt', NULL, '2022-07-30 02:16:47', '2022-07-30 02:17:05'),
(222, 17, 'separate', 'separate', NULL, NULL, NULL, '2022-07-30 02:21:05', '2022-07-30 02:21:05'),
(223, 17, 'take', 'take', NULL, 'tāk', NULL, '2022-07-30 02:24:05', '2022-07-30 02:24:05'),
(224, 17, 'argument', 'argument', NULL, 'ˈärɡyəmənt', NULL, '2022-07-30 02:28:03', '2022-07-30 02:28:03'),
(225, 17, 'parameter', 'parameter', NULL, 'pəˈramədər', NULL, '2022-07-30 02:30:36', '2022-07-30 02:30:36'),
(226, 17, 'overload', 'overload', NULL, NULL, NULL, '2022-07-30 02:54:48', '2022-07-30 02:54:48'),
(227, 17, 'consider', 'consider', NULL, 'kənˈsidər', NULL, '2022-07-30 02:57:08', '2022-07-30 02:57:08'),
(228, 17, 'recursion', 'recursion', NULL, 'rəˈkərZHən', NULL, '2022-07-30 03:00:08', '2022-07-30 03:00:08'),
(229, 17, 'provide', 'provide', NULL, 'prəˈvīd', NULL, '2022-07-30 03:02:00', '2022-07-30 03:02:00'),
(230, 17, 'technique', 'technique', NULL, 'tekˈnēk', NULL, '2022-07-30 03:02:34', '2022-07-30 03:02:34'),
(231, 17, 'complicated', 'complicated', NULL, 'ˈkämpləˌkādəd', NULL, '2022-07-30 03:03:55', '2022-07-30 03:03:55'),
(232, 17, 'figure', 'figure', NULL, 'ˈfiɡyər', NULL, '2022-07-30 03:37:31', '2022-07-30 03:37:31'),
(233, 17, 'procedural', 'procedural', NULL, 'prəˈsējərəl', NULL, '2022-07-30 10:04:42', '2022-07-30 10:04:42'),
(234, 17, 'procedure', 'procedure', NULL, 'prəˈsējər', NULL, '2022-07-30 10:06:16', '2022-07-30 10:06:16'),
(235, 17, 'while', 'while', NULL, '(h)wīl', NULL, '2022-07-30 10:08:09', '2022-07-30 10:08:09'),
(236, 17, 'several', 'several', NULL, 'ˈsev(ə)rəl', NULL, '2022-07-30 10:10:39', '2022-07-30 10:10:39'),
(237, 17, 'advantage', 'advantage', NULL, 'ədˈvan(t)ij', NULL, '2022-07-30 10:11:57', '2022-07-30 10:11:57'),
(238, 17, 'principle', 'principle', NULL, 'ˈprinsəpəl', NULL, '2022-07-30 14:25:45', '2022-07-30 14:26:32'),
(239, 17, 'repetition', 'repetition', NULL, 'ˌrepəˈtiSH(ə)n', NULL, '2022-07-30 14:27:31', '2022-07-30 14:27:31'),
(240, 17, 'place', 'place', NULL, 'plās', NULL, '2022-07-30 14:28:56', '2022-07-30 14:28:56'),
(241, 17, 'reuse', 'reuse', NULL, NULL, NULL, '2022-07-30 14:30:16', '2022-07-30 14:30:16'),
(242, 17, 'illustration', 'illustration', NULL, 'ˌiləˈstrāSH(ə)n', NULL, '2022-07-30 14:32:58', '2022-07-30 14:32:58'),
(243, 18, 'associated', 'associated', NULL, 'əˈsōsēˌādid', NULL, '2022-08-02 03:08:23', '2022-08-02 03:08:23'),
(244, 18, 'associate', 'associate', NULL, NULL, NULL, '2022-08-02 03:08:40', '2022-08-02 03:08:40'),
(245, 18, 'its', 'its', NULL, 'its', NULL, '2022-08-02 03:10:21', '2022-08-02 03:10:21'),
(246, 18, 'belong', 'belong', NULL, 'bəˈlôNG', NULL, '2022-08-02 03:34:28', '2022-08-02 03:34:28'),
(247, 18, 'regular', 'regular', NULL, 'ˈreɡyələr', NULL, '2022-08-02 23:35:57', '2022-08-02 23:35:57'),
(248, 18, 'useful', 'useful', NULL, 'ˈyo͞osfəl', NULL, '2022-08-02 23:37:05', '2022-08-02 23:37:05'),
(249, 18, 'initial', 'initial', NULL, 'iˈniSHəl', NULL, '2022-08-02 23:37:36', '2022-08-02 23:37:36'),
(250, 18, 'corresponding', 'corresponding', NULL, 'ˌkôrəˈspändiNG', NULL, '2022-08-02 23:49:14', '2022-08-02 23:49:14'),
(251, 18, 'quite', 'quite', 'کاملا، واقعا، تماما، بکلی', 'kwīt', 'کو آیت', '2022-08-03 00:01:48', '2022-08-03 00:01:48'),
(252, 18, 'familiar', 'familiar', 'آشنا، خودمانی، وارد در...، مانوس', 'fəˈmilyər', 'فِ میلی اِ(ر)', '2022-08-03 00:03:56', '2022-08-03 00:03:56'),
(253, 18, 'inherited', 'inherited', 'به ارث برده', 'inˈherədəd', 'این هری تِد', '2022-08-03 00:13:20', '2022-08-03 00:13:20'),
(254, 18, 'demonstrate', 'demonstrate', 'نشان دادن، ثابت کردن، شرح دادن، اثبات کردن', 'ˈdemənˌstrāt', 'دِ مِن استری ت (ای ایران)', '2022-08-03 00:18:15', '2022-08-03 00:18:15'),
(255, 18, 'considered', 'considered', 'درنظر گرفته شده، سنجیده، مطرح شده، با اندیشه صحیح', 'kənˈsidərd', NULL, '2022-08-03 03:34:31', '2022-08-03 03:34:31'),
(256, 18, 'achieve', 'achieve', 'رسیدن، دست یافتن، به نتیجه رسیدن', 'əˈCHēv', NULL, '2022-08-03 03:40:25', '2022-08-03 03:40:25'),
(257, 18, 'restricted', 'restricted', 'محدود، محصور، منحصر، در مضیقه', 'rəˈstriktəd', 'ریس تریک تد', '2022-08-03 23:46:04', '2022-08-03 23:46:04'),
(258, 18, 'restrict', 'restrict', 'محدود کردن', 'rəˈstrikt', 'ریس تِرکت', '2022-08-03 23:47:32', '2022-08-03 23:47:32'),
(259, 18, 'ensure', 'ensure', 'مطمعن ساختن، تضمین کردن، متقاعد کردن', 'inˈSHo͝or', 'این شو اَ', '2022-08-03 23:58:24', '2022-08-03 23:58:24'),
(260, 18, 'sure', 'sure', 'مطمعن', 'SHo͝or', 'شوو(ر)', '2022-08-04 00:00:06', '2022-08-04 00:00:06'),
(261, 18, 'inheritance', 'inheritance', 'وراثت', 'inˈherədəns', 'این هَری تِنس', '2022-08-04 00:18:51', '2022-08-04 00:18:51'),
(262, 18, 'category', 'category', 'دسته بندی، دسته، رده، طبقه', 'ˈkadəˌɡôrē', 'کَتِ گُری', '2022-08-04 00:23:05', '2022-08-04 00:23:05'),
(263, 18, 'concept', 'concept', 'مفهوم', 'ˈkänˌsept', 'کان سِپت', '2022-08-04 00:26:00', '2022-08-04 00:26:00'),
(264, 18, 'being', 'being', 'بودن، وجود، هستی', 'ˈbēiNG', 'بی ی نگ', '2022-08-04 00:45:34', '2022-08-04 00:45:34'),
(265, 18, 'derive', 'derive', 'استخراج، مشتق کردن، نتیجه گرفتن', 'dəˈrīv', 'دِرآیو', '2022-08-04 00:58:03', '2022-08-04 00:58:03'),
(266, 18, 'derived', 'derived', 'نشات گرفته، مشتق، ماخوذ', NULL, 'دِرآیود(و،د ساکن)', '2022-08-04 01:02:39', '2022-08-04 01:02:39'),
(267, 18, 'polymorphism', 'polymorphism', 'چند ریختی، پلی مورفیسم', 'ˌpälēˈmôrfizəm', 'پآلی مُرفِسِم', '2022-08-04 09:18:20', '2022-08-04 09:18:20'),
(268, 19, 'eight', 'eight', 'هشت', 'āt', NULL, '2022-08-05 01:57:06', '2022-08-05 01:57:06'),
(269, 19, 'integrated', 'integrated', 'یکپارچه، متحد', 'ˈin(t)əˌɡrādəd', 'این تِ گری تِد (ای..)', '2022-08-05 01:58:44', '2022-08-05 01:58:44'),
(270, 19, 'development', 'development', 'توسعه، رشد، بسط، ایجاد', 'dəˈveləpmənt', 'دیی ول اِپ مِنت', '2022-08-05 02:01:44', '2022-08-05 02:01:44'),
(271, 19, 'environment', 'environment', 'محیط', 'inˈvīrənmənt', 'این وایرن اِمِنت', '2022-08-05 02:04:59', '2022-08-05 02:04:59'),
(272, 19, 'integratedDevelopmentEnvironment', 'integratedDevelopmentEnvironment', 'محیط توسعه یکپارچه IDE', NULL, NULL, '2022-08-05 02:06:06', '2022-08-05 02:06:06'),
(273, 19, 'incorrect', 'incorrect', 'غلط', 'ˌinkəˈrekt', 'این کِرکت', '2022-08-06 00:34:58', '2022-08-06 00:34:58'),
(274, 19, 'initializer', 'initializer', 'مقدار دهی اولیه', 'iˈniSHəˌlīz', 'انی شِ لایز', '2022-08-06 00:38:25', '2022-08-06 00:38:25'),
(275, 19, 'garbage', 'garbage', 'زباله', NULL, 'گابیج', '2022-08-07 02:50:17', '2022-08-07 02:50:17'),
(276, 19, 'enumerator', 'enumerator', 'شمارشگر', 'əˈn(y)o͞oməˌrādər', 'اِنیوو مِریتِر', '2022-08-09 23:21:39', '2022-08-09 23:21:39'),
(277, 19, 'illustrate', 'illustrate', 'نشان دادن، توضیح دادن', 'ˈiləˌstrāt', 'ایل اِستریت', '2022-08-09 23:25:10', '2022-08-09 23:25:10'),
(278, 19, 'parallel', 'parallel', 'موازی', 'ˈperəˌlel', 'پَرِلِل', '2022-08-09 23:27:43', '2022-08-09 23:27:43'),
(279, 19, 'internal', 'internal', 'داخلی، درونی، باطنی', 'inˈtərnl', 'اینتِ(ر)نَل', '2022-08-09 23:30:54', '2022-08-09 23:30:54'),
(280, 19, 'divide', 'divide', 'تقیسم کردن', 'dəˈvīd', 'دِ واید', '2022-08-10 01:24:46', '2022-08-10 01:24:46'),
(281, 19, 'prime', 'prime', 'نخست، اولیه،اصلی، در ریاضی عدد اول', 'prīm', NULL, '2022-08-12 01:50:21', '2022-08-12 01:50:21'),
(282, 19, 'bind', 'bind', 'بستن، مقید کردن،', 'bīnd', NULL, '2022-08-14 02:06:09', '2022-08-14 02:06:09'),
(283, 20, 'equation', 'equation', 'معادله', 'əˈkwāZHən', 'اِکو ای ژن (ای ایران)', '2022-08-16 00:45:52', '2022-08-16 00:45:52'),
(284, 20, 'dash', 'dash', 'خط تیره', 'daSH', 'دَش', '2022-08-16 07:40:06', '2022-08-16 07:40:06'),
(285, 20, 'vendor', 'vendor', 'فروشنده', 'ˈvendər', 'وندَ', '2022-08-16 07:43:35', '2022-08-16 07:43:35'),
(286, 20, 'prefix', 'prefix', 'پیشوند', 'ˈprēˌfiks', 'پِری ی فِکس', '2022-08-16 07:45:30', '2022-08-16 07:45:30'),
(287, 20, 'rainbow', 'rainbow', 'رنگین کمان', 'ˈrānˌbō', 'رِین بَوُ (عین)', '2022-08-16 07:47:38', '2022-08-16 07:47:38'),
(288, 20, 'area', 'area', 'حوزه، ناحیه، منطقه', 'ˈerēə', 'اِ ری اَ', '2022-08-16 07:49:06', '2022-08-16 07:49:06'),
(289, 20, 'radius', 'radius', 'شعاع', 'ˈrādēəs', 'ری دی اِس (شهر ری) (دی - دیشب)', '2022-08-16 07:51:08', '2022-08-16 07:51:08'),
(290, 20, 'stream', 'stream', 'جریان، جوی، نهر، جاری شدن', 'strēm', 'استریم', '2022-08-16 07:53:26', '2022-08-16 07:53:26'),
(291, 20, 'hypertext', 'hypertext', 'فرامتن', 'ˈhīpərˌtekst', 'هآیپِ(ر) تکست', '2022-08-16 07:54:58', '2022-08-16 07:54:58'),
(292, 20, 'preprocessor', 'preprocessor', 'پیش پردازنده', 'prēˈpräsesər', 'پِرِی پِرُ سَسَ', '2022-08-16 07:57:26', '2022-08-16 07:57:26'),
(293, 20, 'collect', 'collect', 'جمع آوری، جمع کردن، فراهم کردن، گردآوری کردن', 'kəˈlekt', 'کِلِکت', '2022-08-16 07:59:05', '2022-08-16 07:59:05'),
(294, 20, 'receive', 'receive', 'دریافت کردن، گرفتن، پذیرفتن', 'rəˈsēv', 'رِسی ی و', '2022-08-16 08:00:43', '2022-08-16 08:00:43'),
(295, 20, 'limited', 'limited', 'محدود، منحصر، مشروط', 'ˈlimədəd', 'لی مِ تت', '2022-08-16 08:02:04', '2022-08-16 08:02:04'),
(296, 20, 'wide', 'wide', 'وسیع، عریض، گشاد، پهن', 'wīd', 'واید (د بسیار نزدیک به ت)', '2022-08-16 08:03:22', '2022-08-16 08:04:10'),
(297, 20, 'wideRange', 'wideRange', 'طیف گسترده ای، محدوده وسیع', NULL, 'واد ری ی نج ( شهر ری کشیده شود)', '2022-08-16 08:06:14', '2022-08-16 08:06:14'),
(298, 20, 'efficiently', 'efficiently', 'به طور موثر', 'əˈfiSHəntlē', 'اِفی شنت لی', '2022-08-16 08:08:26', '2022-08-16 08:08:26'),
(299, 20, 'such', 'such', 'چنین، چنان، این طور', 'səCH', 'ساچ', '2022-08-16 08:09:11', '2022-08-16 08:09:53'),
(300, 20, 'hold', 'hold', 'نگهداشتن، گرفتن', 'hōld', 'هَوولد', '2022-08-16 08:11:52', '2022-08-16 08:11:52'),
(301, 20, 'assign', 'assign', 'اختصاص دادن،', 'əˈsīn', 'اِسآین', '2022-08-16 08:12:59', '2022-08-16 08:12:59'),
(302, 20, 'loosely', 'loosely', 'آزادانه', 'ˈlo͞oslē', 'لوس لی', '2022-08-16 08:14:21', '2022-08-16 08:14:21'),
(303, 21, 'a', '!', NULL, NULL, NULL, '2022-08-16 08:19:12', '2022-08-16 08:19:12'),
(304, 21, 'a1', '!!', NULL, NULL, NULL, '2022-08-16 08:20:04', '2022-08-16 08:20:04'),
(305, 21, 'a2', '!!!!!!!!!!!!!!!!!!!!!!!!', NULL, NULL, NULL, '2022-08-16 08:21:29', '2022-08-16 08:21:29'),
(306, 21, 'a3', '!!!', NULL, NULL, NULL, '2022-08-16 08:21:42', '2022-08-16 08:21:42'),
(307, 21, 'a4', '!!!!', NULL, NULL, NULL, '2022-08-16 08:21:59', '2022-08-16 08:21:59'),
(308, 21, 'a5', '!!!!!', NULL, NULL, NULL, '2022-08-16 08:22:13', '2022-08-16 08:22:13'),
(309, 21, 'a7', '1', NULL, NULL, NULL, '2022-08-16 08:22:30', '2022-08-16 08:22:30'),
(310, 21, 'a11', '1111111111', NULL, NULL, NULL, '2022-08-16 08:22:58', '2022-08-16 08:22:58'),
(311, 21, 'a8', '!!!!!!!!!!', NULL, NULL, NULL, '2022-08-16 08:23:12', '2022-08-16 08:23:12'),
(312, 21, 'b2', '@@@@@@@@', NULL, NULL, NULL, '2022-08-16 08:25:11', '2022-08-16 08:25:11'),
(313, 21, 'b3', '@!@!@!@!@!@12121211112221221!2!2', NULL, NULL, NULL, '2022-08-16 08:25:56', '2022-08-16 08:25:56'),
(314, 21, 'ab', '1212!2!2!2!2!2!2!1!1!1!111!!!@!@1@1@1@1@1', NULL, NULL, NULL, '2022-08-16 08:29:37', '2022-08-16 08:29:37'),
(315, 21, 'ab1', '@2@2@2@221@21@21@21@12@12@', NULL, NULL, NULL, '2022-08-16 08:30:21', '2022-08-16 08:30:21'),
(316, 21, 'aq', 'aq1aq1aq1 aq1aq1 aq1 a q 1 1 q a q a1 11 aa qq aa qq 11 qq 11 111 aa qqqq aa qqq aa 11 aa qq', NULL, NULL, NULL, '2022-08-16 08:34:57', '2022-08-16 08:35:35'),
(317, 20, 'synonym', 'synonym', 'مترادف', 'ˈsinəˌnim', 'سی نِ نِم', '2022-08-18 03:23:31', '2022-08-18 03:23:31'),
(318, 20, 'insufficient', 'insufficient', 'ناکافی', 'ˌinsəˈfiSH(ə)nt', 'این سِ فِ(ی)شِنت', '2022-08-18 09:25:49', '2022-08-18 09:25:49'),
(319, 20, 'allocation', 'allocation', 'تخصیص', 'ˌaləˈkāSH(ə)n', 'اَلِ کی ی شِن (ری)', '2022-08-18 09:27:28', '2022-08-18 09:27:28'),
(320, 20, 'failed', 'failed', 'ناموفق', 'fāld', 'ف ی ی لد (شهر ری)', '2022-08-18 09:28:39', '2022-08-18 09:28:39'),
(321, 20, 'abort', 'abort', 'سقط، سقط جنین، ( یک دستور در c++ برای لغو دستور)', 'əˈbôrt', 'اِ بُ رت', '2022-08-18 09:30:44', '2022-08-18 09:31:15'),
(322, 20, 'deallocate', 'deallocate', 'اختصاص دادن', 'dēˈaləˌkāt', 'دیی اَلِ کِ ی ی ت', '2022-08-18 09:33:53', '2022-08-18 09:34:13'),
(323, 22, 'feature', 'feature', 'ویژگی، خصیصه،جنبه', 'ˈfēCHər', 'فی چ(ر)', '2022-12-21 05:09:13', '2022-12-21 05:11:46'),
(324, 22, 'simply', 'simply', 'به سادگی، واقعا، حقیقتا', 'ˈsimplē', 'سیم پلیی', '2022-12-21 05:27:51', '2022-12-21 05:27:51'),
(325, 22, 'expression', 'expression', 'عبارت، بیان، اصطلاح', 'ikˈspreSHən', 'اکس پِرِشِن', '2022-12-21 05:32:36', '2022-12-21 05:33:06'),
(326, 22, 'most', 'most', 'اکثر، بیشترین', 'mōst', 'مِ اُست', '2022-12-21 05:39:08', '2022-12-21 05:39:08'),
(327, 22, 'announce', 'announce', 'آگهی دادن، انتشار دادن، اعلام کردن، منتشر کردن', 'əˈnouns', 'اِ نَونس', '2022-12-23 00:22:55', '2022-12-23 00:22:55'),
(328, 22, 'premium', 'premium', 'حق بیمه، حق العمل، اعلاء، برتر', 'ˈprēmēəm', 'پیریی میِیم', '2022-12-23 00:34:53', '2022-12-23 00:34:53'),
(329, 22, 'available', 'available', 'موجود، دردسترس، دسترس پذیز، سودمند، قابل استفاده', 'əˈvāləb(ə)l', 'اِ  ویل اِ بول (ای ایران)', '2022-12-23 00:40:52', '2022-12-23 00:40:52'),
(330, 22, 'building', 'building', 'ساختمان، بناء', 'ˈbildiNG', 'بیل دینگ', '2022-12-23 00:47:41', '2022-12-23 00:47:41'),
(331, 22, 'fundamental', 'fundamental', 'اساسی، بنیادی، اصلی، تشکیل دهنده', 'ˌfəndəˈmen(t)əl', 'فاندِ منتُل', '2022-12-23 00:54:50', '2022-12-23 00:54:50'),
(332, 22, 'aspect', 'aspect', 'چهره، سیما، بعد، جنبه', 'ˈaspekt', 'اَس پَکت', '2022-12-23 00:59:04', '2022-12-23 00:59:04'),
(333, 22, 'quirk', 'quirk', 'عجیب و غریب', NULL, NULL, '2022-12-23 02:52:07', '2022-12-23 02:52:07'),
(334, 22, 'lexicographical', 'lexicographical', NULL, NULL, NULL, '2022-12-23 02:55:50', '2022-12-23 02:55:50'),
(335, 22, 'order', 'order', NULL, NULL, NULL, '2022-12-23 02:56:57', '2022-12-23 02:56:57'),
(336, 22, 'comparison', 'comparison', NULL, NULL, NULL, '2022-12-23 02:59:33', '2022-12-23 02:59:33'),
(337, 22, 'strict', 'strict', NULL, NULL, NULL, '2022-12-23 03:10:13', '2022-12-23 03:10:13'),
(338, 22, 'equality', 'equality', NULL, NULL, NULL, '2022-12-23 03:11:08', '2022-12-23 03:11:08'),
(339, 22, 'conditional', 'conditional', NULL, NULL, NULL, '2022-12-23 03:23:50', '2022-12-23 03:23:50'),
(340, 22, 'branching', 'branching', NULL, NULL, NULL, '2022-12-23 03:24:22', '2022-12-23 03:24:22'),
(341, 22, 'official', 'official', NULL, 'official', NULL, '2022-12-23 03:48:06', '2022-12-23 03:48:06'),
(342, 22, 'nullish', 'nullish', NULL, NULL, NULL, '2022-12-23 12:24:46', '2022-12-23 12:24:46'),
(343, 22, 'coalesce', 'coalesce', NULL, 'ˌkōəˈles', NULL, '2022-12-23 12:25:57', '2022-12-23 12:25:57'),
(344, 23, 'eleven', 'eleven', NULL, 'əˈlevən', NULL, '2022-12-23 12:27:05', '2022-12-23 12:27:05'),
(345, 23, 'anonymous', 'anonymous', NULL, 'əˈnänəməs', NULL, '2022-12-23 12:30:54', '2022-12-23 12:30:54'),
(346, 23, 'nickname', 'nickname', NULL, 'ˈnikˌnām', NULL, '2022-12-23 12:31:48', '2022-12-23 12:31:48'),
(347, 23, 'nick', 'nick', NULL, 'nik', NULL, '2022-12-23 12:33:14', '2022-12-23 12:33:14'),
(348, 23, 'height', 'height', NULL, 'hīt', NULL, '2022-12-23 12:36:02', '2022-12-23 12:36:02'),
(349, 23, 'precedence', 'precedence', NULL, 'ˈpresədəns', NULL, '2022-12-23 12:41:42', '2022-12-23 12:41:42'),
(350, 23, 'associativity', 'associativity', NULL, NULL, NULL, '2022-12-23 12:49:18', '2022-12-23 12:49:18'),
(351, 23, 'consider', 'consider', NULL, 'kənˈsidər', NULL, '2022-12-23 12:56:16', '2022-12-23 12:56:16'),
(352, 23, 'within', 'within', NULL, 'wəˈT͟Hin', NULL, '2022-12-23 12:59:22', '2022-12-23 12:59:22'),
(353, 23, 'arithmetic', 'arithmetic', NULL, NULL, NULL, '2022-12-24 03:38:04', '2022-12-24 03:38:04'),
(354, 23, 'actual', 'actual', NULL, 'ˈak(t)SH(o͞o)əl', NULL, '2022-12-24 03:39:14', '2022-12-24 03:39:14'),
(355, 23, 'Instead', 'Instead', NULL, NULL, NULL, '2022-12-24 03:41:06', '2022-12-24 03:41:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_book_unique` (`book`);

--
-- Indexes for table `book_types`
--
ALTER TABLE `book_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `book_types_book_unique` (`book`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessons_book_id_foreign` (`book_id`),
  ADD KEY `lessons_lesson_index` (`lesson`);

--
-- Indexes for table `lesson_sections`
--
ALTER TABLE `lesson_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_sections_lesson_id_foreign` (`lesson_id`),
  ADD KEY `lesson_sections_lesson_section_index` (`lesson_section`);

--
-- Indexes for table `lesson_types`
--
ALTER TABLE `lesson_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_types_book_type_id_foreign` (`book_type_id`),
  ADD KEY `lesson_types_lesson_index` (`lesson`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `links_lesson_section_id_foreign` (`lesson_section_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sentences`
--
ALTER TABLE `sentences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sentences_word_id_foreign` (`word_id`),
  ADD KEY `sentences_sentence_index` (`sentence`(768));

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`id`),
  ADD KEY `words_lesson_type_id_foreign` (`lesson_type_id`),
  ADD KEY `words_word_index` (`word`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `book_types`
--
ALTER TABLE `book_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `lesson_sections`
--
ALTER TABLE `lesson_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `lesson_types`
--
ALTER TABLE `lesson_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=356;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lesson_sections`
--
ALTER TABLE `lesson_sections`
  ADD CONSTRAINT `lesson_sections_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lesson_types`
--
ALTER TABLE `lesson_types`
  ADD CONSTRAINT `lesson_types_book_type_id_foreign` FOREIGN KEY (`book_type_id`) REFERENCES `book_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_lesson_section_id_foreign` FOREIGN KEY (`lesson_section_id`) REFERENCES `lesson_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sentences`
--
ALTER TABLE `sentences`
  ADD CONSTRAINT `sentences_word_id_foreign` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `words_lesson_type_id_foreign` FOREIGN KEY (`lesson_type_id`) REFERENCES `lesson_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
