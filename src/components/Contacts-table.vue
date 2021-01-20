<template>
    <div class="contacts-table">
        <div class="container">
            <div class="contact-table__box-head">
                <div class="contact-table__item-head">
                    №
                </div>
                <div class="contact-table__item-head">
                    Имя контакта
                </div>
                <div class="contact-table__item-head">
                    Удалить
                </div>
            </div>
            <div class="contact-table__box-body" v-for="(contact, index) in contacts" :key="contact.id">
                <div class="contact-table__item-body">
                    <span class="contact-table__item-body--span">№: </span>{{index + 1}}
                </div>
                <router-link :to="{name: 'Contact-Info', params: {id: contact.id}}" class="contact-table__item-body">
                    <span class="contact-table__item-body--span">Имя контакта: </span>{{contact.name}}
                </router-link>
                <div class="contact-table__item-body delete" @click.prevent="deleteContact(index)">
                    Удалить
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {busGetContacts} from '../main'

export default {
    name: "ContactsTable",
    data: () => ({
        contacts: []
    }),
    mounted() {
        this.getContacts()
        busGetContacts.$on('getContacts', this.getContacts)
    },
    methods: {
        //Функция для сохранение контактов
        saveContact() {
            const sItem = JSON.stringify(this.contacts)
            localStorage.setItem('contacts', sItem)
        },
        //Функция для получения всех контактов
        getContacts() {
            this.contacts = JSON.parse(localStorage.getItem('contacts'))
        },
        //Функция для удаления контакта
        deleteContact(index) {
            const agree = confirm("Вы уверены, что хотите удалить?")
            if(agree) {
                this.contacts.splice(index, 1)
                this.saveContact()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .contacts-table {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .contact-table__box-head {
        display: flex;
        background: #ccc;
    }
    .contact-table__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 700;
        font-size: 16px;
        padding: 5px;
        text-align: center;
        overflow: hidden;
    }
    .contact-table__box-body {
        display: flex;
    }
    .contact-table__item-body {
        display: block;
        border: 1px solid #000;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
        overflow: hidden;
    }
    .contact-table__item-body--span {
        font-weight: 700;
        font-size: 16px;
        display: none;
    }
@media screen and (max-width: 500px) {
    .contact-table__box-head {
        display: none;
    }
    .contact-table__box-body {
        display: block;
        margin-bottom: 15px;
        &:last-child {
            margin-bottom: 0px;
        }
    }
    .contact-table__item-body--span {
        display: inline-block;
        padding-right: 5px;
    }
}
</style>