<template>
    <div class="contacts">
        <CreateContact />
        <ContactsTable />
    </div>
</template>

<script>
import ContactsTable from '../components/Contacts-table'
import CreateContact from '../components/Create-Contact'

export default {
    name: "Contacts",
    components: {
        ContactsTable,
        CreateContact
    }
}
</script>