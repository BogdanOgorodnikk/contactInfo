<template>
    <div class="contact-info-table">
        <div class="container">
            <h2 class="contact-info-table__headline">Информация об контакте</h2>
            <button @click.prevent="backEdit" class="contact-info-table__button">Шаг назад</button>
            <router-link to="/" class="contact-info-table__back">Вернутся к списку контактов</router-link>
            <div class="contact-info-table__box-head">
                <div class="contact-info-table__item-head">
                    Название поля
                </div>
                <div class="contact-info-table__item-head">
                    Значение
                </div>
                <div class="contact-info-table__item-head">
                    Редактировать
                </div>
                <div class="contact-info-table__item-head">
                    Удалить
                </div>
            </div>
            <div class="contact-info-table__box-body" v-for="(value,name) in contact" :key="value.id">
                <div class="contact-info-table__item-body">
                    {{name}}
                </div>
                <div class="contact-info-table__item-body">
                    {{value}}
                </div>
                <div class="contact-info-table__item-body edit" @click.prevent="showEditLine(name, value)">
                    Редактировать
                </div>
                <div class="contact-info-table__item-body delete" @click.prevent="deleteLine(name)">
                    Удалить
                </div>
            </div>
        </div>
        <!-- Модальное окно для редактирования -->
        <EditContactLine v-if="edit"
            :edit = "edit"
            :name = "name"
            :newName = "newName"
            :value = "value"
            :contact = "contact"
            :firstValue = "firstValue"
            @CancelEdit="ChangeEdit"
            @CloseEdit="CloseEdit"
        />
    </div>
</template>

<script>
import EditContactLine from './Edit-Contact-Line'
import {busGetContacts} from '../main'

export default {
    name: "ContactInfoTable",
    data: () => ({
        contact: [],
        name: '',
        value: '',
        firstValue: '',
        newName: '',
        backName: '',
        backValue: '',
        edit: false
    }),
    mounted() {
        this.getContact()
        //Шина для вызова функции получения информации об контакте при его обновлении 
        busGetContacts.$on('getContactLine', this.getContact)
    },
    methods: {
        //Функция для получения информации об контакте
        getContact() {
            const result = JSON.parse(localStorage.getItem('contacts'))
            //Подбор контакта, что нам подходит по id
            result.forEach(element => {
                if(element.id == this.$route.params.id) {
                    this.contact = element
                }
            });
        },
        //Функция для удаления поля с его значением
        deleteLine(name) {
            const agree = confirm("Вы уверены, что хотите удалить?")
            if(agree) {
                if(name == "name" || name == "id") {
                    return
                }
                delete this.contact[name]
                this.saveContacts(this.contact)
                this.getContact()
            }
        },
        //Функция для изменения ключа в обьекте
        renameKeys(obj, newKeys) {
            const keyValues = Object.keys(obj).map(key => {
                const newKey = newKeys[key] || key;
                return { [newKey]: obj[key] };
            });
            return Object.assign({}, ...keyValues);
        },
        //Функция для того, чтобы откатить последнее обновления
        backEdit() {
            if(!this.backName && !this.backValue) {
                return
            }
            const newKey = {}
            newKey[this.newName] = this.backName
            this.contact = this.renameKeys(this.contact, newKey)
            this.contact[this.backName] = this.backValue
            this.saveContacts(this.contact)
        },
        //Функция для сохранения информации об контакте
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
        //Функция для вызова модального окна, чтобы редактировать поле и значение
        showEditLine(name, value) {
            if(name == 'id') {
                return
            }
            this.edit = !this.edit
            this.name = name
            this.newName = name
            this.value = value
            this.firstValue = value
        },
        //Функция для получения данных если обновление не удалось
        ChangeEdit(data) {
            this.edit = data
            this.getContact()
        },
        //Функция для получения данных если функция обновления удалась 
        CloseEdit(data) {
            this.edit = data[0]
            this.newName = data[1]
            this.backName = data[2]
            this.backValue = data[3]
            this.getContact()
        }
    },
    components: {
        EditContactLine
    }
}
</script>

<style lang="scss" scoped>
    .contact-info-table {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .contact-info-table__headline {
        font-size: 20px;
        margin-bottom: 15px;
    }
    .contact-info-table__button {
        display: block;
        margin-bottom: 15px;
        border-radius: 8px;
        padding: 5px;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        background: #00a814;
        border: none;
        cursor: pointer;
    }
    .contact-info-table__back {
        display: block;
        margin-bottom: 15px;
    }
    .contact-info-table__box-head {
        display: flex;
        background: #ccc;
    }
    .contact-info-table__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 700;
        font-size: 16px;
        padding: 5px;
        text-align: center;
    }
    .contact-info-table__box-body {
        display: flex;
    }
    .contact-info-table__item-body {
        border: 1px solid #000;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
    }
</style>