const STORAGE_KEY = 'hotgest_db';
const USER_KEY = 'logged_user';

const initialDatabase = {
    users: [
        { id: 1, username: 'admin', password: '123', role: 'admin_geral', name: 'Administrador Geral / Diretoria' },
        { id: 2, username: 'manutencao', password: '123', role: 'admin_manutencao', name: 'Gestor de Manutencao' },
        { id: 3, username: 'controlador', password: '123', role: 'controlador', name: 'Controlador de Almoxarifado' },
        { id: 4, username: 'executor_avac', password: '123', role: 'trabalhador', name: 'Fernando Tecnico AVAC' },
        { id: 5, username: 'executor_hidraulica', password: '123', role: 'trabalhador', name: 'Marina Tecnica Hidraulica' },
        { id: 6, username: 'executor_eletrica', password: '123', role: 'trabalhador', name: 'Caio Tecnico Eletrica' }
    ],
    messages: [
        { id: 1, from: 3, to: 4, content: 'A O.S #1095 precisa de atencao urgente. Va ao lobby agora.', read: false, time: Date.now() - 1000 * 60 * 15 }
    ],
    inventory: [
        { id: 1, name: 'Pilha AA', stock: 150, unit: 'un', minStock: 50, unitCost: 4.5, area: 'Eletrica' },
        { id: 2, name: 'Filtro AC Cassete', stock: 12, unit: 'un', minStock: 20, unitCost: 82, area: 'AVAC' },
        { id: 3, name: 'Lampada LED Dicroica', stock: 45, unit: 'un', minStock: 20, unitCost: 18, area: 'Eletrica' },
        { id: 4, name: 'Vedante Hidraulico', stock: 30, unit: 'un', minStock: 10, unitCost: 12, area: 'Hidraulica' }
    ],
    tickets: [
        {
            id: 1095,
            title: 'Vazamento Chiller AC Central',
            category: 'Manutencao',
            location: 'Master Suite 05',
            priority: 'critical',
            status: 'new',
            createdBy: 3,
            createdTime: Date.now() - 1000 * 60 * 30,
            startTime: null,
            pausedAt: null,
            totalPausedMs: 0,
            completionTime: null,
            notifiedTime: Date.now() - 1000 * 60 * 10,
            assignedTo: null,
            description: 'Condensacao intensa no forro e gotejamento sobre area social.',
            materialsUsed: []
        },
        {
            id: 1096,
            title: 'Fechadura RFID Offline',
            category: 'Manutencao',
            location: 'Ala Leste - Quarto 102',
            priority: 'normal',
            status: 'in_progress',
            createdBy: 2,
            createdTime: Date.now() - 1000 * 60 * 180,
            startTime: Date.now() - 1000 * 60 * 120,
            pausedAt: null,
            totalPausedMs: 0,
            completionTime: null,
            notifiedTime: null,
            assignedTo: 4,
            description: 'Hospede sem acesso ao quarto. Validar pilhas e modulo RFID.',
            materialsUsed: []
        },
        {
            id: 1090,
            title: 'Controle TV Lobby',
            category: 'Manutencao',
            location: 'Lobby Principal',
            priority: 'normal',
            status: 'awaiting_inventory',
            createdBy: 2,
            createdTime: Date.now() - 1000 * 60 * 60 * 6,
            startTime: Date.now() - 1000 * 60 * 60 * 5,
            pausedAt: null,
            totalPausedMs: 0,
            completionTime: Date.now() - 1000 * 60 * 60 * 3,
            notifiedTime: null,
            assignedTo: 4,
            description: 'Troca de pilhas e recalibracao do controle universal.',
            materialsUsed: [
                { inventoryId: 1, quantity: 2 }
            ]
        }
    ]
};

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0);
}

function ensureNumber(value, fallback) {
    return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function normalizeTicket(ticket) {
    return {
        category: 'Manutencao',
        description: '',
        createdBy: null,
        createdTime: Date.now(),
        startTime: null,
        pausedAt: null,
        totalPausedMs: 0,
        completionTime: null,
        notifiedTime: null,
        assignedTo: null,
        materialsUsed: [],
        ...ticket
    };
}

function normalizeDatabase(rawDb) {
    const seed = clone(initialDatabase);
    const db = rawDb || {};
    return {
        users: Array.isArray(db.users) && db.users.length ? db.users : seed.users,
        messages: Array.isArray(db.messages) ? db.messages : seed.messages,
        inventory: Array.isArray(db.inventory) && db.inventory.length
            ? db.inventory.map(item => ({
                unitCost: 0,
                area: 'Geral',
                ...item
            }))
            : seed.inventory,
        tickets: Array.isArray(db.tickets) && db.tickets.length
            ? db.tickets.map(normalizeTicket)
            : seed.tickets.map(normalizeTicket)
    };
}

function computeElapsedMs(ticket) {
    if (!ticket || !ticket.startTime) {
        return 0;
    }

    const endReference = ticket.status === 'awaiting_inventory' || ticket.status === 'completed'
        ? (ticket.completionTime || Date.now())
        : (ticket.pausedAt || Date.now());

    const total = endReference - ticket.startTime - (ticket.totalPausedMs || 0);
    return Math.max(0, total);
}

function computeTicketMaterialsValue(ticket, inventory) {
    return (ticket.materialsUsed || []).reduce((sum, material) => {
        const item = inventory.find(entry => entry.id === material.inventoryId);
        return sum + ((item?.unitCost || 0) * material.quantity);
    }, 0);
}

function nextId(items) {
    return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
}

window.MockDB = {
    init: function() {
        const raw = localStorage.getItem(STORAGE_KEY);
        const normalized = normalizeDatabase(raw ? JSON.parse(raw) : null);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    },

    get: function() {
        const raw = localStorage.getItem(STORAGE_KEY);
        return normalizeDatabase(raw ? JSON.parse(raw) : null);
    },

    save: function(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeDatabase(data)));
    },

    reset: function() {
        this.save(clone(initialDatabase));
        localStorage.removeItem(USER_KEY);
    },

    getCurrentUser: function() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    login: function(username, password) {
        const db = this.get();
        const user = db.users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            return user;
        }
        return null;
    },

    logout: function() {
        localStorage.removeItem(USER_KEY);
        window.location.href = 'login.html';
    },

    requireLogin: function(allowedRoles = []) {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return null;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            alert('Acesso negado. Voce nao tem permissao para acessar esta pagina.');
            this.routeUser(user);
            return null;
        }

        return user;
    },

    routeUser: function(user) {
        window.location.href = this.getHomePageForUser(user);
    },

    getHomePageForUser: function(user) {
        return user.role === 'trabalhador' ? 'mobile_app.html' : 'dashboard.html';
    },

    populateUserProfile: function(user, options = {}) {
        const initialsId = options.initialsId || 'userInitials';
        const nameId = options.nameId || 'userNameLabel';
        const roleId = options.roleId || 'userRoleLabel';
        const initialsNode = document.getElementById(initialsId);
        const nameNode = document.getElementById(nameId);
        const roleNode = document.getElementById(roleId);

        if (initialsNode) {
            initialsNode.innerText = user.name.substring(0, 2).toUpperCase();
        }
        if (nameNode) {
            nameNode.innerText = user.name;
        }
        if (roleNode) {
            roleNode.innerText = user.role.toUpperCase().replace('_', ' ');
        }
    },

    buildDesktopNav: function(user, currentPage) {
        const items = [
            { href: 'dashboard.html', label: 'Dashboard Geral', icon: 'layout-dashboard', roles: ['admin_geral', 'admin_manutencao', 'controlador'] },
            { href: 'os_list.html', label: 'Quadro Kanban', icon: 'list-todo', roles: ['admin_geral', 'admin_manutencao', 'controlador'] },
            { href: 'dashboard_create_os.html', label: 'Designar Executor', icon: 'user-plus', roles: ['admin_geral', 'admin_manutencao', 'controlador'] },
            { href: 'preventive_schedule.html', label: 'Preventivas', icon: 'calendar-check-2', roles: ['admin_geral', 'admin_manutencao', 'controlador'] },
            { href: 'inventory_leak.html', label: 'Sangria / Inventario', icon: 'shield-alert', roles: ['admin_geral', 'controlador'] },
            { href: 'messages.html', label: 'Comunicacoes', icon: 'mail', roles: ['admin_manutencao', 'controlador'] }
        ];

        return items
            .filter(item => item.roles.includes(user.role))
            .map(item => {
                const active = item.href === currentPage;
                const activeClass = active
                    ? 'bg-teal-50 dark:bg-teal-600/20 text-teal-700 dark:text-teal-500 font-medium border border-teal-200 dark:border-teal-500/30'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700/50 transition';

                return `<a href="${item.href}" class="flex items-center gap-3 px-4 py-3 rounded-lg ${activeClass}"><i data-lucide="${item.icon}" class="w-5 h-5"></i> <span>${item.label}</span></a>`;
            })
            .join('');
    },

    getMobileScheduleLink: function(user) {
        if (user.role === 'controlador') {
            return 'preventive_schedule.html';
        }

        const preventiveTicket = this.get().tickets.find(ticket => ticket.status !== 'completed' && ticket.id === 1090)
            || this.get().tickets.find(ticket => ticket.assignedTo === user.id && ticket.status !== 'completed');

        return preventiveTicket ? `mobile_os_detail.html?ticketId=${preventiveTicket.id}` : 'mobile_new_os.html';
    },

    getExecutors: function() {
        return this.get().users.filter(user => user.role === 'trabalhador');
    },

    getTicketById: function(ticketId) {
        const db = this.get();
        return db.tickets.find(ticket => ticket.id === Number(ticketId)) || null;
    },

    createTicket: function(payload) {
        const db = this.get();
        const nextId = db.tickets.reduce((maxId, ticket) => Math.max(maxId, ticket.id), 1000) + 1;
        const user = this.getCurrentUser();
        const ticket = normalizeTicket({
            id: nextId,
            title: payload.title,
            category: payload.category,
            location: payload.location,
            priority: payload.priority,
            status: 'new',
            createdBy: user?.id || null,
            createdTime: Date.now(),
            notifiedTime: Date.now(),
            description: payload.description || ''
        });

        db.tickets.unshift(ticket);
        this.save(db);
        return ticket;
    },

    assignTicket: function(ticketId, assigneeId, senderId, content) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket) {
            return null;
        }

        ticket.assignedTo = Number(assigneeId);
        ticket.status = 'in_progress';
        ticket.startTime = ticket.startTime || Date.now();
        ticket.pausedAt = null;
        ticket.notifiedTime = null;

        db.messages.push({
            id: Date.now(),
            from: senderId,
            to: Number(assigneeId),
            content,
            read: false,
            time: Date.now()
        });

        this.save(db);
        return ticket;
    },

    toggleTicketTimer: function(ticketId) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket) {
            return null;
        }

        if (!ticket.startTime) {
            ticket.startTime = Date.now();
            ticket.pausedAt = null;
            ticket.status = 'in_progress';
        } else if (ticket.pausedAt) {
            ticket.totalPausedMs += Date.now() - ticket.pausedAt;
            ticket.pausedAt = null;
            ticket.status = 'in_progress';
        } else {
            ticket.pausedAt = Date.now();
        }

        this.save(db);
        return ticket;
    },

    completeTicket: function(ticketId, materialsUsed) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket) {
            return null;
        }

        ticket.materialsUsed = materialsUsed
            .filter(item => item.quantity > 0)
            .map(item => ({
                inventoryId: Number(item.inventoryId),
                quantity: Number(item.quantity)
            }));
        ticket.completionTime = Date.now();
        ticket.pausedAt = null;
        ticket.status = ticket.materialsUsed.length ? 'awaiting_inventory' : 'completed';

        this.save(db);
        return ticket;
    },

    approveInventoryForTicket: function(ticketId) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || ticket.status !== 'awaiting_inventory') {
            return null;
        }

        ticket.materialsUsed.forEach(material => {
            const item = db.inventory.find(entry => entry.id === material.inventoryId);
            if (item) {
                item.stock = Math.max(0, item.stock - material.quantity);
            }
        });

        ticket.status = 'completed';
        this.save(db);
        return ticket;
    },

    markMessagesAsRead: function(userId) {
        const db = this.get();
        db.messages.forEach(message => {
            if (message.to === Number(userId)) {
                message.read = true;
            }
        });
        this.save(db);
    },

    getUnreadCount: function(userId) {
        const db = this.get();
        return db.messages.filter(message => message.to === Number(userId) && !message.read).length;
    },

    getDashboardMetrics: function() {
        const db = this.get();
        const criticalTickets = db.tickets.filter(ticket => ticket.priority === 'critical' && (ticket.status === 'completed' || ticket.status === 'awaiting_inventory'));
        const avgCriticalMs = criticalTickets.length
            ? criticalTickets.reduce((sum, ticket) => sum + computeElapsedMs(ticket), 0) / criticalTickets.length
            : 2.1 * 60 * 60 * 1000;
        const avgCriticalHours = (avgCriticalMs / (1000 * 60 * 60)).toFixed(1);

        const leakage = db.tickets
            .filter(ticket => ticket.status === 'awaiting_inventory')
            .reduce((sum, ticket) => sum + computeTicketMaterialsValue(ticket, db.inventory), 0);

        const preventiveBase = 140 + db.tickets.filter(ticket => ticket.category === 'Preventiva').length;
        const completed = db.tickets.filter(ticket => ticket.status === 'completed').length;

        return {
            sla_media_critica: `${String(avgCriticalHours).replace('.', ',')}h`,
            leakage_identified: formatCurrency(leakage),
            preventive_month: `${preventiveBase}/150`,
            co_forced: `${Math.min(99, 88 + completed)}%`
        };
    },

    getEstancamentoSeries: function() {
        const db = this.get();
        const completedTickets = db.tickets.filter(ticket => ticket.status === 'completed' || ticket.status === 'awaiting_inventory');
        const ownEfficiency = completedTickets.length ? completedTickets.map((ticket, index) => {
            const elapsedHours = Math.max(0.3, computeElapsedMs(ticket) / (1000 * 60 * 60));
            return {
                label: `OS ${ticket.id}`,
                hotgest: Number(elapsedHours.toFixed(1)),
                totvs: Number((elapsedHours * 6.2).toFixed(1))
            };
        }) : [
            { label: 'OS 1090', hotgest: 0.6, totvs: 3.7 },
            { label: 'OS 1096', hotgest: 1.9, totvs: 11.8 }
        ];

        return ownEfficiency;
    },

    getTicketClock: function(ticketId) {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) {
            return null;
        }

        return {
            elapsedMs: computeElapsedMs(ticket),
            isRunning: Boolean(ticket.startTime) && !ticket.pausedAt && ticket.status === 'in_progress'
        };
    },

    getInventorySuggestionsForTicket: function(ticket) {
        const db = this.get();
        const categoryAreaMap = {
            Manutencao: ['AVAC', 'Eletrica', 'Hidraulica', 'Geral'],
            'Limpeza Extra': ['Geral'],
            'Achados / Perdidos': ['Geral'],
            Preventiva: ['AVAC', 'Eletrica', 'Hidraulica']
        };
        const areas = categoryAreaMap[ticket?.category] || ['Geral'];
        return db.inventory.filter(item => areas.includes(item.area) || item.area === 'Geral');
    },

    addInventoryItem: function(payload) {
        const db = this.get();
        db.inventory.push({
            id: nextId(db.inventory),
            name: payload.name,
            stock: ensureNumber(payload.stock, 0),
            unit: payload.unit || 'un',
            minStock: ensureNumber(payload.minStock, 0),
            unitCost: ensureNumber(payload.unitCost, 0),
            area: payload.area || 'Geral'
        });
        this.save(db);
        return db.inventory[db.inventory.length - 1];
    },

    importInventoryCSV: function(csvText) {
        const lines = csvText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        if (lines.length <= 1) {
            return { imported: 0 };
        }

        const importedItems = [];
        for (const line of lines.slice(1)) {
            const [name, stock, unit, minStock, unitCost, area] = line.split(',').map(value => value.trim());
            if (!name) {
                continue;
            }
            importedItems.push(this.addInventoryItem({
                name,
                stock,
                unit,
                minStock,
                unitCost,
                area
            }));
        }

        return { imported: importedItems.length, items: importedItems };
    },

    sendDirectMessage: function(fromUserId, toUserId, content) {
        const db = this.get();
        const newMessage = {
            id: nextId(db.messages),
            from: Number(fromUserId),
            to: Number(toUserId),
            content,
            read: false,
            time: Date.now()
        };
        db.messages.push(newMessage);
        this.save(db);
        return newMessage;
    },

    getMessageRecipients: function(userId) {
        return this.get().users.filter(entry => entry.id !== Number(userId));
    }
};

MockDB.init();

window.mockExport = function(format) {
    if (format === 'pdf') {
        alert('Relatorio PDF gerado com sucesso. Simulacao do MVP.');
    } else if (format === 'csv') {
        alert('CSV exportado com sucesso. Simulacao do MVP.');
    } else {
        alert('Tabela copiada. Simulacao do MVP.');
    }
};
