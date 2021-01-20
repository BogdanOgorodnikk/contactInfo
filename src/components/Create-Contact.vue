<template>
    <div class="create-contact">
        <div class="container">
            <form class="create-contact__form" @submit.prevent="createContact(name)">
                <input class="create-contact__form--input" type="text" placeholder="Имя контакта" v-model="name">
                <button class="create-contact__form--button" type="submit">Создать новый контакт</button>
            </form>
        </div>
    </div>
</template>

<script>
import {busGetContacts} from '../main'

export default {
    data: () => ({
        name: "",
        contacts: []
    }),
    methods: {
        //Функция для сохранения контактов в локальное хранилище
        saveContact() {
            const sItem = JSON.stringify(this.contacts)
            localStorage.setItem('contacts', sItem)
        },
        //Функция для создания нового контакта
        createContact(name) {
            //Проверка на пустоту поля
            if(!this.name ) {
                return
            }
            //Проверка иснует ли у нас в локальном хранилище 'contacts'
            if(localStorage.getItem('contacts')) {
                this.contacts = JSON.parse(localStorage.getItem('contacts'))    
            }
            this.name = name
            this.contacts.push({
                id: this.randomId(1000),
                name: this.name
            })
            this.name = ''
            this.saveContact()
            //Шина, для обновление данных 
            busGetContacts.$emit('getContacts')
        },
        //Функция для рандомного id
        randomId(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
    },
    name: "CreateContact"
}
</script>

<style lang="scss" scoped>
    .create-contact {
        margin-top: 30px;
    }
    .create-contact__form--input {
        border: 1px solid #000;
        border-radius: 8px;
        padding: 5px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
    }
    .create-contact__form--button {
        border: 0;
        border-radius: 8px;
        background: #00a814;
        padding: 5px;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        margin-left: 15px;
        cursor: pointer;
    }
@media screen and (max-width: 500px) {
    .create-contact__form--input {
        display: block;
        width: 100%;
    }
    .create-contact__form--button {
        display: block;
        margin-left: 0px;
        margin-top: 15px;
    }
}
</style>