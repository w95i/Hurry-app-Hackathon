<template>
    <div class="popup_container" @click="togglePopup">
        <div class="popup_wrapper" @click.stop>
            <div class="popup_header">
                <i class="ri-close-fill" @click="togglePopup"></i>
            </div>
            <div class="popup_content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        togglePopup() {
            this.$emit("toggle-popup");
        },
        ClosePopup() {
            this.$emit("toggle-popup");
        },
    },
};
</script>

<style scoped>
.popup_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 1000;
}

.popup_container .popup_wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    min-width: 550px;
    width: fit-content;
    min-height: 300px;
    max-height: 90%;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--ui-bg);
    border-radius: 12px;
}

.popup_wrapper::-webkit-scrollbar {
    width: 5px;
    padding: 10px 0;
    margin-left: 10px;
}

.popup_wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px var(--light-gray);
    border-radius: 10px;
}

.popup_wrapper::-webkit-scrollbar-thumb {
    background: var(--dark-gray);
    border-radius: 10px;
    padding: 10px 0;
}

.popup_wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
    border-radius: 10px;
}

.popup_wrapper .popup_header {
    width: 100%;
    text-align: start;
}

.popup_header i {
    font-size: 24px;
    cursor: pointer;
}

.popup_header i:hover {
    color: red;
}

.popup_wrapper .popup_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
}

.popup_content .delete_icon {
    background-color: #fec2c2;
    color: #c20d0d;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete_icon i {
    font-size: 54px;
}

.popup_wrapper .titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.titles .main-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0%;
    color: #222222;
}

.titles .sub-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0%;
    color: var(--dark-gray);
}

.popup_wrapper .actions {
    display: flex;
    gap: 12px;
}

.actions button {
    width: 160px;
    height: 43px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19.2px;
    letter-spacing: 0%;
    font-family: var(--font-family);
    border: none;
    outline: none;
    cursor: pointer;
}

.actions .cancel {
    box-shadow: 0 2px 2px 0 #0000000d;
    border: 1px solid #e5e5ef;
    background-color: var(--white);
}

.actions .confirm {
    background-color: #c20d0d;
    color: var(--white);
}

.actions .cancel:hover {
    background-color: var(--light-gray);
}

.actions .confirm:hover {
    background-color: #f92626;
}

@media (max-width: 768px) {
    .popup_container .popup_wrapper {
        width: 90%;
        min-width: 90%;
    }
}
</style>