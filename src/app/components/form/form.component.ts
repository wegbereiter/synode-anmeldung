import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'register-form',
    template: require('./form.html'),
})
export class FormComponent {
    @Input() data = {};
    @Output() post = new EventEmitter();

    private fields = [
        {name: 'name', required: true, label: 'Vor- und Nachname'},
        {name: 'email', required: true, label: 'E-Mail', type: 'email'},
        {name: 'street', required: true, label: 'Straße'},
        {name: 'zip', required: true, label: 'PLZ'},
        {name: 'city', required: true, label: 'Ort'},
        {name: 'country', required: true, label: 'Land'},
        {name: 'mobile', label: 'Handy-Nummer'},
        {name: 'allergies', label: 'Allergien / Unverträglichkeiten', type: 'textarea'},
        {name: 'birthday', required: true, label: 'Geburtstag', type: 'date'},
        {name: 'npc', label: 'NPC', type: 'checkbox', help: 'Bitte nur nach vorheriger Rücksprache!'},
        {name: 'itName', required: true, label: 'IT-Name'},
        {name: 'sigil', required: true, label: 'Siegel', type: 'select', options: ['Keines', 'Osten', 'Norden', 'Westen', 'Süden', 'Mitte']},
        {name: 'room', label: 'Ich möchte ein Zimmer mit...', help: 'Wir versuchen allen Wünschen nachzugehen, können aber nichts versprechen.'},
    ];

    private terms = require('./downloads/agb.pdf');

    sendForm() {
        this.post.emit(this.data);
    }
}