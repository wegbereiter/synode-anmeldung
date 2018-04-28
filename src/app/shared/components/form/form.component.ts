import * as moment from 'moment';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormData } from '../../data';

@Component({
    selector: 'wb-register-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent {
    @Input() public data: FormData = {};
    @Input() public maxBirthday = moment();
    @Output() public post = new EventEmitter<FormData>();
    @Output() public privacy = new EventEmitter<null>();

    public fields = [
        {name: 'name', required: true, label: 'Vor- und Nachname'},
        {name: 'email', required: true, label: 'E-Mail', type: 'email'},
        {name: 'street', required: true, label: 'Straße'},
        {name: 'zip', required: true, label: 'PLZ'},
        {name: 'city', required: true, label: 'Ort'},
        {name: 'country', required: true, label: 'Land'},
        {name: 'mobile', label: 'Handy-Nummer'},
        {name: 'licensePlate', label: 'KFZ-Kennzeichen', hint: 'Nur erforderlich, wenn du mit deinem eigenen PKW anreist.'},
        {
            name: 'diet',
            required: true,
            label: 'Ich bin...',
            type: 'select',
            options: ['Allesesser', 'Vegetarier', 'Veganer'],
        },
        {name: 'allergies', label: 'Allergien / Unverträglichkeiten', type: 'textarea'},
        {name: 'fears', label: 'Ängste / Phobien', type: 'textarea', hint: 'Hier können zum Beispiel Dinge wie "Höhenangst" eingetragen werden, welche das Spiel auf der Burgruine für dich einschränken könnten.'},
        {name: 'birthday', required: true, label: 'Geburtstag (DD.MM.YYYY)', type: 'date', min: () => moment('1900-01-01'), max: () => this.maxBirthday},
        {name: 'npc', label: 'NPC', type: 'checkbox', help: 'Bitte nur nach vorheriger Rücksprache!'},
        {name: 'itName', required: true, label: 'IT-Name'},
        {name: 'itPowers', required: false, label: 'Charakter-Besonderheiten', hint: `Bist du ein Freundschaftsträger der Elemente oder sogar ein Mitray'Kor?`},
        {
            name: 'sigil',
            required: true,
            label: 'Siegel',
            type: 'select',
            options: ['Keines', 'Osten', 'Norden', 'Westen', 'Süden', 'Reich der Rosen'],
        },
        {
            name: 'room',
            label: 'Ich möchte ein Zimmer mit...',
            help: 'Wir versuchen allen Wünschen nachzugehen, können aber nichts versprechen.',
        },
    ];

    public sendForm() {
        const normalized = {};
        Object.keys(this.data).forEach((key) => {
            const field = <any> this.fields.filter(field => field.name === key).pop();
            if (field && field.type === 'checkbox') {
                normalized[key] = !!this.data[key];
            }
            else normalized[key] = this.data[key];
        });
        this.post.emit(normalized);
    }

    public openPrivacy() {
        this.privacy.emit();
    }
}