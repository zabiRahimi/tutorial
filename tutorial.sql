-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2022 at 09:30 AM
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
  `book` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
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
(6, 'css', 'css', '2022-03-31 02:52:28', '2022-03-31 02:52:28');

-- --------------------------------------------------------

--
-- Table structure for table `book_types`
--

CREATE TABLE `book_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
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
(7, 'css', 'css', '2022-03-26 02:36:10', '2022-03-26 02:36:10');

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
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `lesson` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
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
(8, 2, 'اجرای همزمان', 'run-laravel', '2022-03-31 02:53:24', '2022-03-31 02:53:56');

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
(21, 7, 4, 'استفاده از ()Object.create برای مشخص کردن prototype', '<p dir=\"auto\">ویژگی <code>__Proto__  </code>  از ES6 به بعد وارد js شد قبل از اون از متد <code>Object.create() </code> برای ارث بری استفاده می‌شد به صورت زیر</p><pre><code class=\"language-js\">const p= {\n  nameP:\'hassan\'\n}\n\nlet ch={\n  mame:\'reza\'\n}\n ch=Object.create(p);\n\nch.nameP\n// resutl =&gt; hassan\n</code></pre><h4 dir=\"auto\">نکته : اعمال ارث بری با این روش متغییر فرزند نمی تواند از نوع const باشد باید از نوع let  و یا var باشد. </h4>', '2022-03-21 02:46:15', '2022-03-21 02:46:15');

-- --------------------------------------------------------

--
-- Table structure for table `lesson_types`
--

CREATE TABLE `lesson_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_type_id` bigint(20) UNSIGNED NOT NULL,
  `lesson` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.',
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
(7, 7, 'grid', 'grid', '2022-03-26 02:36:31', '2022-03-26 02:36:31');

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
(11, '2022_01_08_073023_create_sentences_table', 1);

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
(1, 34, 'my condolences', 'تسلیت میگم', 'my /kənˈdoʊlənses/', 'مای کِن دُوُ لِن سِس', '2022-03-12 04:23:01', '2022-03-12 04:23:01'),
(2, 34, 'Please send my condolences to his widow.', 'لطفا همدردی و تسلیت مرا به بیوه اش برسان، (منظور زن آن مرحوم هست)', 'ˈwidō', 'ویدُو (بیوه)', '2022-03-12 04:28:53', '2022-03-12 04:28:53'),
(3, 34, 'letter of condolence', 'نامه تسلیت (آمیز)', NULL, NULL, '2022-03-12 04:30:09', '2022-03-12 04:30:09'),
(4, 36, 'sorry for your loss', 'برای از دست دادن (عزیزتان) متاسفم', NULL, NULL, '2022-03-12 04:38:10', '2022-03-12 04:38:10'),
(5, 41, 'always in my mind', 'همیشه در خاطرم هستی', NULL, NULL, '2022-03-12 04:49:58', '2022-03-12 04:49:58'),
(6, 39, 'rest in peace', 'روحش شاد، در آرامش بیاساید', NULL, NULL, '2022-03-12 04:51:00', '2022-03-12 04:51:00');

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
  `link` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'استفاده در آدرس',
  `word` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mean` varchar(110) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'معنی',
  `pronounceEn` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'تلفظ به انگلیسی',
  `pronounceFa` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'تلفظ به فارسی',
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
(39, 2, 'rest', 'rest', 'سامان، استراحت، اسایش، نتیجه، باقی، باقی مانده،', '/ˈrest/', NULL, '2022-03-12 04:46:11', '2022-03-12 04:46:11'),
(40, 2, 'peace', 'peace', 'سازش، ارامش، اشتی، سلامت، سلامتی، صلح، صلح و صفا', '/ˈpiːs/', NULL, '2022-03-12 04:46:48', '2022-03-12 04:46:48'),
(41, 2, 'mind', 'mind', 'خاطره، یاد، نظر (نظریات)،سامان، خیال، ضمیر، مشعر، خاطر، خرد، عقل، ذهن', '/ˈmaɪnd/', 'مایند', '2022-03-12 04:48:28', '2022-03-12 04:48:28'),
(42, 3, 'representational', 'representational', 'نمایندگی', 'reprəˌzenˈtāSH(ə)n(ə)l و /ˌreprəzənˈteɪʃənəl/', 'رِپ ریزِن تی شنال', '2022-03-12 06:47:11', '2022-03-12 06:47:11'),
(43, 3, 'state', 'state', 'چگونگی، حال، حالت، ایالت، استان', '/ˈsteɪt/', NULL, '2022-03-12 07:11:20', '2022-03-12 07:11:20'),
(44, 3, 'transfer', 'transfer', 'واگذاری، انتقال، سند انتقال، تحویل، نقل، انتقالی، انتقال دادن،  بردن، جابجا کردن، ترا فرست کردن،', '/ˈtrænsfɜːr/', NULL, '2022-03-12 07:12:55', '2022-03-12 07:12:55'),
(45, 3, 'interface', 'interface', 'رابط', 'ˈin(t)ərˌfās', 'اینتًر فِیس', '2022-03-12 07:24:44', '2022-03-12 07:24:44'),
(46, 4, 'json', 'json', NULL, NULL, 'جسون', '2022-03-13 02:15:25', '2022-03-13 02:15:25'),
(47, 4, 'object', 'object', 'هدف، شی', NULL, 'آبجَکت', '2022-03-13 02:17:08', '2022-03-13 02:17:08'),
(48, 4, 'Notation', 'notation', 'نشانه گذاری، حاشیه نویسی، بخاطرسپاری، توجه، یادداشت، ثبت', '/noʊˈteɪʃn̩/', NULL, '2022-03-13 02:19:39', '2022-03-13 02:19:39'),
(49, 4, 'resource', 'recource', 'منبع، منابع، ابتکار، کاردانی', '/ˈriː.sɔːrs/', NULL, '2022-03-13 02:22:01', '2022-03-13 02:22:01'),
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
(68, 7, 'column', 'column', 'ستون', 'käləm', 'کالِم', '2022-03-26 02:42:13', '2022-03-26 02:42:13');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `book_types`
--
ALTER TABLE `book_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `lesson_sections`
--
ALTER TABLE `lesson_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `lesson_types`
--
ALTER TABLE `lesson_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

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
