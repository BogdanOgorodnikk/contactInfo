<template>
    <div class="edit-contact-line">
        <div class="opinion" @click.self="RemoveEdit"></div>
        <div class="edit-contact-line__box">
            <h2 class="edit-contact-line__headline">Редактирования поля</h2>
            <form class="edit-contact-line__form" @submit.prevent="updateInfoLine(newName, value)">
                <p class="edit-contact-line__form--text">Введите новое название поля</p>
                <input type="text" class="edit-contact-line__form--input" placeholder="Название поля" v-model="newName">
                <p class="edit-contact-line__form--text">Введите новое значение поля</p>
                <input type="text" class="edit-contact-line__form--input" placeholder="Значение" v-model="value">
                <div class="edit-contact-line__form--block">
                    <input type="submit" class="edit-contact-line__form--button" value="Изменить">
                    <button @click.prevent="RemoveEdit" class="edit-contact-line__form--button">Отмена</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditContactLine",
    props: ['edit', 'name', 'newName', 'value', 'contact', 'firstValue'],
    methods: {
        //Функция для изменения ключа елемента
        renameKeys(obj, newKeys) {
            const keyValues = Object.keys(obj).map(key => {
                const newKey = newKeys[key] || key;
                return { [newKey]: obj[key] };
            });
            return Object.assign({}, ...keyValues);
        },
        //Функция для обновления поля с значением
        updateInfoLine(newName, value) {
            this.newName = newName
            this.value = value
            this.contact[this.name] = this.value
            //Проверка поля на значение 'name', чтобы нельзя было изменить имя, так как оно статическое
            if(this.name != "name") {
                const newKey = {}
                newKey[this.name] = this.newName
                this.contact = this.renameKeys(this.contact, newKey)
            }
            //Сохранения изменений
            this.saveContacts(this.contact)
            this.close()
        },
        //Функция для сохранений изменений 
        saveContacts(contact) {
            const data = JSON.parse(localStorage.getItem('contacts'))
            for (const key in data) {
                if(data[key].id == contact.id) {
                    data[key] = contact
                }
            }
            const sItem = JSON.stringify(data)
            localStorage.setItem('contacts', sItem)
        },
        //Функция для закрытия модального окна, если обновление поля и значение было успешным
        close() {
            this.edit = !this.edit
            this.$emit('CloseEdit', [this.edit, this.newName, this.name, this.firstValue])
        },
        //Функция для закрытия модального окна, если обновление не удалось
        RemoveEdit() {
            const agree = confirm("Вы уверены, что хотите отменить изминение?")
            if(agree) {
                this.edit = !this.edit
                this.$emit('CancelEdit', this.edit)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .opinion {
        background: rgba(0,0,0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .edit-contact-line__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 244px;
        position: fixed;
        left: 34%;
        top: 20%;
        border-radius: 8px;
    }
    .edit-contact-line__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .edit-contact-line__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .edit-contact-line__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-top: 5px;
    }
    .edit-contact-line__form--block {
        display: flex;
        margin-top: 26px;
    }
    .edit-contact-line__form--button {
        display: block;
        margin: 0 auto;
        border-radius: 8px;
        padding: 5px;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        width: 40%;
        background: #00a814;
        border: none;
        cursor: pointer;
        &:last-child {
            background: #e51f1f;
        }
    }
    .edit-contact-line__form--input {
        border: 1px solid #000;
        border-radius: 8px;
        padding: 5px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        width: 98%;
        margin-top: 10px;
    }
</style>