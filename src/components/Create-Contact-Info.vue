<template>
    <div class="create-contact-info">
        <div class="container">
            <form class="create-contact-info__form" @submit.prevent="createLine(lineName, lineValue)">
                <input type="text" class="create-contact-info__form--input" placeholder="Название поля" v-model="lineName">
                <input type="text" class="create-contact-info__form--input" placeholder="Значение" v-model="lineValue">
                <button type="submit" class="create-contact-info__form--button">Создать</button>
            </form>
        </div>
    </div>
</template>

<script>
import {busGetContacts} from '../main'

export default {
    name: "CreateContactInfo",
    data: () => ({
        lineName: '',
        lineValue: '',
        contact: []
    }),
    methods: {
        //Функция для получения информации об контакте с его полями и значениям
        getContact() {
            const result = JSON.parse(localStorage.getItem('contacts'))
            //Проверка контакта, что нам подходит
            result.forEach(element => {
                if(element.id == this.$route.params.id) {
                    this.contact = element
                }
            });
        },
        //Создание нового поля с новым значением
        createLine(lineName, lineValue) {
            this.getContact()
            this.lineName = lineName
            this.lineValue = lineValue
            //Проверка на пустоту полей
            if(!this.lineName && !this.lineValue) {
                return
            }
            this.contact[lineName] = lineValue
            this.saveContacts(this.contact)
            busGetContacts.$emit('getContactLine')
            this.lineName = ''
            this.lineValue = ''
        },
        //Сохранения новых полей у контакта
        saveContacts(contact) {
            const data = JSON.parse(localStorage.getItem('contacts'))
            for (const key in data) {
                if(data[key].id == contact.id) {
                    data[key] = contact
                }
            }
            const sItem = JSON.stringify(data)
            localStorage.setItem('contacts', sItem)
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-contact-info {
        margin-top: 30px;
    }
    .create-contact-info__form--input {
        border: 1px solid #000;
        border-radius: 8px;
        padding: 5px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        margin-right: 15px;
    }
    .create-contact-info__form--button {
        border: 0;
        border-radius: 8px;
        background: #00a814;
        padding: 5px;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
    }
</style>