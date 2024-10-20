<script>
export default {
  name: 'ViewBackGround',
}
</script>

<template>
    <div class="background">
        <div class="header">
            <img src="../assets/logo.png" alt="Logo" id="logo">
            <img src="../assets/phanthi.png" alt="PhanThi" id="phan-thi">
        </div>
        <div class="footer">
            <img src="../assets/topleft.png" alt="left" id="leftbottom">
            <img src="../assets/topleft.png" alt="left" id="rightbottom">
        </div>
    </div>
</template>

<style>
.background {
    background-image: url('../assets/background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2%;
        height: 10%;
    }
    
    #logo {
        max-width: 18%;
        height: auto;
    }
    
    #phan-thi {
        max-width: 20%;
        height: auto;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 10%;
    }

    #leftbottom {
        max-width: 20%;
        height: auto;
        transform: scaleX(-1);
    }
    #rightbottom {
        max-width: 20%;
        height: auto;
    }
}
</style>