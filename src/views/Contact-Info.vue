<template>
    <div class="contact-info">
        <CreateContactInfo />
        <ContactInfoTable />
    </div>
</template>

<script>
import CreateContactInfo from '../components/Create-Contact-Info.vue'
import ContactInfoTable from '../components/Contact-Info-Table'

export default {
    name: "ContactInfo",
    components: {
        CreateContactInfo,
        ContactInfoTable
    }
}
</script>