// Setelah login berhasil, redirect ke halaman form
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    $url = 'form.php';
    header('Location: ' . $url);
    exit;
}
// Setelah login berhasil, periksa role pengguna
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    $role = $_SESSION["role"];
    if($role == 'admin'){
        $url = 'admin_form.php';
    } elseif($role == 'staff'){
        $url = 'staff_form.php';
    } else {
        $url = 'default_form.php';
    }
    header('Location: ' . $url);
    exit;
}