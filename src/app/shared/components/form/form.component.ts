import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { FormData } from '../../data';

interface FieldDefinition {
    name: string;
    label: string;
    required?: boolean;
    type?: string;
    hint?: string;
    options?: string[];
    min?: () => moment.Moment;
    max?: () => moment.Moment;
    ignore?: () => boolean;
}

@Component({
    selector: 'wb-register-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent {
    @Input() public data: FormData = {};
    @Input() public minAge = null;
    @Input() public maxBirthday = moment();
    @Input() public npc = false;
    @Input() public itRoom = false;
    @Input() public roomRequest = false;
    @Input() public fears = false;
    @Input() public npcPermit = false;
    @Output() public post = new EventEmitter<FormData>();
    @Output() public privacy = new EventEmitter<null>();

    public fields: FieldDefinition[] = [
        { name: 'name', required: true, label: 'Vor- und Nachname' },
        { name: 'email', required: true, label: 'E-Mail', type: 'email' },
        { name: 'street', required: true, label: 'Straße' },
        { name: 'zip', required: true, label: 'PLZ' },
        { name: 'city', required: true, label: 'Ort' },
        { name: 'country', required: true, label: 'Land' },
        { name: 'mobile', label: 'Handy-Nummer' },
        {
            name: 'licensePlate',
            label: 'KFZ-Kennzeichen',
            hint: 'Nur erforderlich, wenn du mit deinem eigenen PKW anreist.',
        },
        {
            name: 'diet',
            required: true,
            label: 'Ich bin...',
            type: 'select',
            options: ['Allesesser', 'Vegetarier', 'Veganer'],
        },
        { name: 'allergies', label: 'Allergien / Unverträglichkeiten', type: 'textarea' },
        {
            name: 'fears',
            label: 'Ängste / Phobien',
            type: 'textarea',
            hint: 'Beispiel: Höhenangst',
            ignore: () => !this.fears,
        },
        {
            name: 'birthday',
            required: true,
            label: 'Geburtstag (DD.MM.YYYY)',
            type: 'date',
            min: () => moment('1900-01-01'),
            max: () => this.maxBirthday,
        },
        {
            name: 'npc',
            label: 'NSC',
            type: 'checkbox',
            hint: this.npcPermit ? 'Bitte nur nach vorheriger Rücksprache!' : null,
            ignore: () => !this.npc,
        },
        { name: 'itName', required: true, label: 'IT-Name' },
        {
            name: 'itPowers',
            required: false,
            label: 'Charakter-Besonderheiten',
            hint: `Bist du ein Freundschaftsträger der Elemente oder sogar ein Mitray'Kor?`,
        },
        {
            name: 'sigil',
            required: true,
            label: 'Siegel',
            type: 'select',
            options: ['Keines', 'Osten', 'Norden', 'Westen', 'Süden', 'Reich der Rosen'],
        },
        {
            name: 'itBedroom',
            required: true,
            label: 'Ein durchgängig bespielter Schlafraum ist...',
            type: 'select',
            options: [
                'unerwünscht',
                'erwünscht',
                'erwünscht, aber nicht wenn es durch Dritte (NSC) betreten wird',
            ],
            hint:
                'Deine persönlichen Gegenstände dürfen niemals entwendet, beschädigt oder bewegt werden.',
            ignore: () => !this.itRoom,
        },
        {
            name: 'room',
            label: 'Ich möchte ein Zimmer mit...',
            hint: 'Wir versuchen allen Wünschen nachzugehen, können aber nichts versprechen.',
            ignore: () => !this.roomRequest,
        },
        {
            name: 'comment',
            label: 'Sonstige Anmerkungen',
            type: 'textarea',
        },
    ];

    public sendForm() {
        const normalized = {};
        Object.keys(this.data).forEach(key => {
            const field = <any>this.fields.filter(field => field.name === key).pop();
            if (field && field.type === 'checkbox') {
                normalized[key] = !!this.data[key];
            } else normalized[key] = this.data[key];
        });
        this.post.emit(normalized);
    }

    public openPrivacy(event) {
        event.stopPropagation();
        event.preventDefault();
        this.privacy.emit();
    }
}
