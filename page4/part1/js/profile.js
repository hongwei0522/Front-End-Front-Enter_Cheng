document.querySelector('.modify').addEventListener('click', function() {
    // 啟用輸入欄位
    let inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.disabled = false;
    });

    // 顯示確認和取消按鈕，隱藏修改資料按鈕
    document.querySelector('.profile-confirm-cancel').style.display = 'block';
    this.style.display = 'none';
});

document.querySelector('.confirm').addEventListener('click', function() {
    // 儲存資料的邏輯在這裡（例如發送到伺服器）

    // 禁用輸入欄位
    let inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.disabled = true;
    });

    // 隱藏確認和取消按鈕，顯示修改資料按鈕
    document.querySelector('.profile-confirm-cancel').style.display = 'none';
    document.querySelector('.modify').style.display = 'block';
});

document.querySelector('.cancel').addEventListener('click', function() {
    // 恢復到原始狀態，不儲存修改資料

    let inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.disabled = true;
    });

    // 隱藏確認和取消按鈕，顯示修改資料按鈕
    document.querySelector('.profile-confirm-cancel').style.display = 'none';
    document.querySelector('.modify').style.display = 'block';
});
