 // Incluir o script.js que você forneceu aqui
        let forklifts = [
            { id: 'EMP-001', model: 'Toyota 8FG25', type: 'Gás', capacity: '2.5T', hourMeter: 1250, status: 'Em Operação' },
            { id: 'EMP-002', model: 'Hyster H3.0FT', type: 'Gás', capacity: '3.0T', hourMeter: 980, status: 'Em Operação' },
            { id: 'EMP-003', model: 'Yale ERP030', type: 'Elétrica', capacity: '3.0T', hourMeter: 2100, status: 'Aguardando Manutenção' },
            { id: 'EMP-004', model: 'Crown RR5725', type: 'Retrátil', capacity: '2.5T', hourMeter: 1500, status: 'Em Operação' },
            { id: 'EMP-005', model: 'Toyota 7FBE20', type: 'Elétrica', capacity: '2.0T', hourMeter: 890, status: 'Parada' },
        ];

        let operations = [
            { id: 'OP-001', operator: 'João Silva', forklift: 'EMP-001', sector: 'Armazenagem', startTime: '08:00', hourMeterStart: 1250, status: 'Em Andamento' },
            { id: 'OP-002', operator: 'Maria Santos', forklift: 'EMP-002', sector: 'Expedição', startTime: '08:15', hourMeterStart: 980, status: 'Em Andamento' },
            { id: 'OP-003', operator: 'Pedro Costa', forklift: 'EMP-004', sector: 'Recebimento', startTime: '07:45', hourMeterStart: 1500, status: 'Em Andamento' },
        ];

        let operators = [
            { id: 'OPR-001', name: 'João Silva', phone: '(11) 99999-9999', aso: '2024-12-31', nr: '2024-12-31', status: 'Ativo' },
            { id: 'OPR-002', name: 'Maria Santos', phone: '(11) 98888-8888', aso: '2024-11-30', nr: '2024-11-30', status: 'Ativo' },
            { id: 'OPR-003', name: 'Pedro Costa', phone: '(11) 97777-7777', aso: '2024-10-31', nr: '2024-10-31', status: 'Ativo' },
            { id: 'OPR-004', name: 'Ana Oliveira', phone: '(11) 96666-6666', aso: '2024-09-30', nr: '2024-09-30', status: 'Inativo' },
        ];

        let maintenances = [
            { id: 'MNT-001', forklift: 'EMP-003', type: 'Preventiva', description: 'Troca de óleo e filtros', date: '2024-10-28', status: 'Agendada', responsible: 'Técnico João' },
            { id: 'MNT-002', forklift: 'EMP-005', type: 'Corretiva', description: 'Reparo no sistema elétrico', date: '2024-10-25', status: 'Concluída', responsible: 'Técnico Maria' },
            { id: 'MNT-003', forklift: 'EMP-001', type: 'Preventiva', description: 'Verificação de freios', date: '2024-11-05', status: 'Agendada', responsible: 'Técnico Carlos' },
        ];

        let supplies = [
            { id: 'ABS-001', forklift: 'EMP-001', fuelType: 'Gás', quantity: '50L', date: '2024-10-26', cost: 250.00, hourMeter: 1245 },
            { id: 'ABS-002', forklift: 'EMP-002', fuelType: 'Gás', quantity: '45L', date: '2024-10-25', cost: 225.00, hourMeter: 975 },
            { id: 'ABS-003', forklift: 'EMP-004', fuelType: 'Diesel', quantity: '30L', date: '2024-10-24', cost: 180.00, hourMeter: 1495 },
        ];

        let operationIdCounter = 4;
        let operatorIdCounter = 5;
        let maintenanceIdCounter = 4;
        let supplyIdCounter = 4;

        function initializeApp() {
            setupNavigation();
            loadForkliftsTable();
            loadOperationsTable();
            loadOperatorsTable();
            loadMaintenancesTable();
            loadSuppliesTable();
            setupForkliftModal();
            setupOperationModal();
            setupOperatorModal();
            setupMaintenanceModal();
            setupSupplyModal();
            updateDashboardStats();
        }

        function setupNavigation() {
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();

                    const targetPage = item.getAttribute('data-page');

                    menuItems.forEach(mi => mi.classList.remove('active'));
                    item.classList.add('active');

                    const pages = document.querySelectorAll('.page');
                    pages.forEach(page => page.classList.remove('active'));

                    const targetElement = document.getElementById(targetPage);
                    if (targetElement) {
                        targetElement.classList.add('active');
                    }
                });
            });
        }

        function loadForkliftsTable() {
            const tableBody = document.querySelector('#forkliftsTable tbody');
            tableBody.innerHTML = '';

            forklifts.forEach((forklift, index) => {
                const row = document.createElement('tr');

                const statusClass = getStatusClass(forklift.status);

                row.innerHTML = `
                    <td>${forklift.id}</td>
                    <td>${forklift.model}</td>
                    <td>${forklift.type}</td>
                    <td>${forklift.capacity}</td>
                    <td>${forklift.hourMeter}h</td>
                    <td><span class="status-badge ${statusClass}">${forklift.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon edit" onclick="editForklift(${index})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" onclick="deleteForklift(${index})" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        function loadOperationsTable() {
            const tableBody = document.querySelector('#operationsTable tbody');
            tableBody.innerHTML = '';

            operations.forEach((operation, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${operation.id}</td>
                    <td>${operation.operator}</td>
                    <td>${operation.forklift}</td>
                    <td>${operation.sector}</td>
                    <td>${operation.startTime}</td>
                    <td><span class="status-badge in-progress">${operation.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon end" onclick="endOperation(${index})" title="Finalizar">
                                <i class="fas fa-stop"></i>
                            </button>
                            <button class="btn-icon delete" onclick="deleteOperation(${index})" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });

            populateForkliftSelect();
        }

        function loadOperatorsTable() {
            const tableBody = document.querySelector('#operatorsTable tbody');
            if (!tableBody) {
                console.log('Tabela de operadores não encontrada');
                return;
            }
            
            tableBody.innerHTML = '';

            operators.forEach((operator, index) => {
                const row = document.createElement('tr');

                const asoStatus = checkDocumentStatus(operator.aso);
                const nrStatus = checkDocumentStatus(operator.nr);

                row.innerHTML = `
                    <td>${operator.id}</td>
                    <td>${operator.name}</td>
                    <td>${operator.phone}</td>
                    <td><span class="status-badge ${asoStatus.class}">${formatDate(operator.aso)}</span></td>
                    <td><span class="status-badge ${nrStatus.class}">${formatDate(operator.nr)}</span></td>
                    <td><span class="status-badge ${operator.status === 'Ativo' ? 'active' : 'stopped'}">${operator.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon edit" onclick="editOperator(${index})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" onclick="deleteOperator(${index})" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        function loadMaintenancesTable() {
            const tableBody = document.querySelector('#maintenancesTable tbody');
            if (!tableBody) {
                console.log('Tabela de manutenção não encontrada');
                return;
            }
            
            tableBody.innerHTML = '';

            maintenances.forEach((maintenance, index) => {
                const row = document.createElement('tr');

                const statusClass = getMaintenanceStatusClass(maintenance.status);

                row.innerHTML = `
                    <td>${maintenance.id}</td>
                    <td>${maintenance.forklift}</td>
                    <td>${maintenance.type}</td>
                    <td>${maintenance.description}</td>
                    <td>${formatDate(maintenance.date)}</td>
                    <td><span class="status-badge ${statusClass}">${maintenance.status}</span></td>
                    <td>${maintenance.responsible}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon complete" onclick="completeMaintenance(${index})" title="${maintenance.status === 'Concluída' ? 'Reverter' : 'Concluir'}">
                                <i class="fas ${maintenance.status === 'Concluída' ? 'fa-undo' : 'fa-check'}"></i>
                            </button>
                            <button class="btn-icon edit" onclick="editMaintenance(${index})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" onclick="deleteMaintenance(${index})" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        function loadSuppliesTable() {
            const tableBody = document.querySelector('#suppliesTable tbody');
            if (!tableBody) {
                console.log('Tabela de abastecimento não encontrada');
                return;
            }
            
            tableBody.innerHTML = '';

            supplies.forEach((supply, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${formatDate(supply.date)}</td>
                    <td>${supply.forklift}</td>
                    <td>${supply.fuelType}</td>
                    <td>${supply.quantity}</td>
                    <td>R$ ${supply.cost.toFixed(2)}</td>
                    <td>${supply.hourMeter}h</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon edit" onclick="editSupply(${index})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" onclick="deleteSupply(${index})" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        function populateForkliftSelect() {
            const select = document.getElementById('operationForklift');
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecione a empilhadeira</option>';

            const availableForklifts = forklifts.filter(f => f.status === 'Em Operação');
            const forkliftInUse = operations.map(op => op.forklift);

            availableForklifts.forEach(forklift => {
                if (!forkliftInUse.includes(forklift.id)) {
                    const option = document.createElement('option');
                    option.value = forklift.id;
                    option.textContent = `${forklift.id} - ${forklift.model}`;
                    option.dataset.hourMeter = forklift.hourMeter;
                    select.appendChild(option);
                }
            });
        }

        function populateForkliftSelectForMaintenance() {
            const select = document.getElementById('maintenanceForklift');
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecione a empilhadeira</option>';

            forklifts.forEach(forklift => {
                const option = document.createElement('option');
                option.value = forklift.id;
                option.textContent = `${forklift.id} - ${forklift.model}`;
                select.appendChild(option);
            });
        }

        function populateForkliftSelectForSupply() {
            const select = document.getElementById('supplyForklift');
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecione a empilhadeira</option>';

            forklifts.forEach(forklift => {
                const option = document.createElement('option');
                option.value = forklift.id;
                option.textContent = `${forklift.id} - ${forklift.model}`;
                select.appendChild(option);
            });
        }

        function populateOperatorSelect() {
            const select = document.getElementById('operationOperator');
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecione o operador</option>';

            const activeOperators = operators.filter(o => o.status === 'Ativo');
            
            activeOperators.forEach(operator => {
                const option = document.createElement('option');
                option.value = operator.name;
                option.textContent = `${operator.name}`;
                select.appendChild(option);
            });
        }

        function getStatusClass(status) {
            const statusMap = {
                'Em Operação': 'active',
                'Aguardando Manutenção': 'maintenance',
                'Parada': 'stopped',
                'Em Andamento': 'in-progress'
            };
            return statusMap[status] || 'stopped';
        }

        function getMaintenanceStatusClass(status) {
            const statusMap = {
                'Agendada': 'maintenance',
                'Em andamento': 'in-progress',
                'Concluída': 'active',
                'Cancelada': 'stopped'
            };
            return statusMap[status] || 'stopped';
        }

        function checkDocumentStatus(dateString) {
            const today = new Date();
            const documentDate = new Date(dateString);
            const diffTime = documentDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 30) return { class: 'active', text: 'Válido' };
            if (diffDays > 0) return { class: 'maintenance', text: 'Próximo do vencimento' };
            return { class: 'stopped', text: 'Vencido' };
        }

        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        }

        function setupForkliftModal() {
            const form = document.getElementById('forkliftForm');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const id = document.getElementById('forkliftId').value || `EMP-${String(forklifts.length + 1).padStart(3, '0')}`;
                
                const forklift = {
                    id: id,
                    model: document.getElementById('forkliftModel').value,
                    type: document.getElementById('forkliftType').value,
                    capacity: document.getElementById('forkliftCapacity').value,
                    hourMeter: parseInt(document.getElementById('forkliftHourMeter').value),
                    status: document.getElementById('forkliftStatus').value
                };

                forklifts.push(forklift);
                loadForkliftsTable();
                updateDashboardStats();
                closeForkliftModal();
                form.reset();
            });
        }

        function setupOperationModal() {
            const form = document.getElementById('operationForm');
            if (!form) return;
            
            const forkliftSelect = document.getElementById('operationForklift');
            const hourMeterInput = document.getElementById('operationHourMeter');

            if (forkliftSelect) {
                forkliftSelect.addEventListener('change', (e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    if (selectedOption.dataset.hourMeter) {
                        hourMeterInput.value = selectedOption.dataset.hourMeter;
                    }
                });
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const now = new Date();
                const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

                const operation = {
                    id: `OP-${String(operationIdCounter).padStart(3, '0')}`,
                    operator: document.getElementById('operationOperator').value,
                    forklift: document.getElementById('operationForklift').value,
                    sector: document.getElementById('operationSector').value,
                    startTime: timeString,
                    hourMeterStart: parseInt(document.getElementById('operationHourMeter').value),
                    status: 'Em Andamento'
                };

                operationIdCounter++;
                operations.push(operation);
                
                // Atualizar status da empilhadeira para "Em Operação"
                const forkliftIndex = forklifts.findIndex(f => f.id === operation.forklift);
                if (forkliftIndex !== -1) {
                    forklifts[forkliftIndex].status = 'Em Operação';
                }
                
                loadOperationsTable();
                loadForkliftsTable();
                updateDashboardStats();
                closeOperationModal();
                form.reset();
            });
        }

        function setupOperatorModal() {
            const form = document.getElementById('operatorForm');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const operator = {
                    id: `OPR-${String(operatorIdCounter).padStart(3, '0')}`,
                    name: document.getElementById('operatorName').value,
                    phone: document.getElementById('operatorPhone').value,
                    aso: document.getElementById('operatorASO').value,
                    nr: document.getElementById('operatorNR').value,
                    status: document.getElementById('operatorStatus').value
                };

                operatorIdCounter++;
                operators.push(operator);
                loadOperatorsTable();
                updateDashboardStats();
                closeOperatorModal();
                form.reset();
            });
        }

        function setupMaintenanceModal() {
            const form = document.getElementById('maintenanceForm');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const maintenance = {
                    id: `MNT-${String(maintenanceIdCounter).padStart(3, '0')}`,
                    forklift: document.getElementById('maintenanceForklift').value,
                    type: document.getElementById('maintenanceType').value,
                    description: document.getElementById('maintenanceDescription').value,
                    date: document.getElementById('maintenanceDate').value,
                    status: document.getElementById('maintenanceStatus').value,
                    responsible: document.getElementById('maintenanceResponsible').value
                };

                maintenanceIdCounter++;
                maintenances.push(maintenance);
                
                // Atualizar status da empilhadeira para "Aguardando Manutenção"
                const forkliftIndex = forklifts.findIndex(f => f.id === maintenance.forklift);
                if (forkliftIndex !== -1 && maintenance.status === 'Agendada') {
                    forklifts[forkliftIndex].status = 'Aguardando Manutenção';
                }
                
                loadMaintenancesTable();
                loadForkliftsTable();
                updateDashboardStats();
                closeMaintenanceModal();
                form.reset();
            });
        }

        function setupSupplyModal() {
            const form = document.getElementById('supplyForm');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const supply = {
                    id: `ABS-${String(supplyIdCounter).padStart(3, '0')}`,
                    forklift: document.getElementById('supplyForklift').value,
                    fuelType: document.getElementById('supplyFuelType').value,
                    quantity: document.getElementById('supplyQuantity').value,
                    date: document.getElementById('supplyDate').value,
                    cost: parseFloat(document.getElementById('supplyCost').value),
                    hourMeter: parseInt(document.getElementById('supplyHourMeter').value)
                };

                supplyIdCounter++;
                supplies.push(supply);
                loadSuppliesTable();
                closeSupplyModal();
                form.reset();
            });
        }

        function openForkliftModal() {
            const modal = document.getElementById('forkliftModal');
            if (modal) {
                modal.style.display = 'block';
            }
        }

        function closeForkliftModal() {
            const modal = document.getElementById('forkliftModal');
            if (modal) {
                modal.style.display = 'none';
                document.getElementById('forkliftForm').reset();
                document.getElementById('forkliftId').value = '';
            }
        }

        function openOperationModal() {
            populateForkliftSelect();
            populateOperatorSelect();
            const modal = document.getElementById('operationModal');
            if (modal) {
                modal.style.display = 'block';
            }
        }

        function closeOperationModal() {
            const modal = document.getElementById('operationModal');
            if (modal) {
                modal.style.display = 'none';
                document.getElementById('operationForm').reset();
            }
        }

        function openOperatorModal() {
            const modal = document.getElementById('operatorModal');
            if (modal) {
                modal.style.display = 'block';
            }
        }

        function closeOperatorModal() {
            const modal = document.getElementById('operatorModal');
            if (modal) {
                modal.style.display = 'none';
                document.getElementById('operatorForm').reset();
                document.getElementById('operatorId').value = '';
            }
        }

        function openMaintenanceModal() {
            populateForkliftSelectForMaintenance();
            const modal = document.getElementById('maintenanceModal');
            if (modal) {
                modal.style.display = 'block';
            }
        }

        function closeMaintenanceModal() {
            const modal = document.getElementById('maintenanceModal');
            if (modal) {
                modal.style.display = 'none';
                document.getElementById('maintenanceForm').reset();
                document.getElementById('maintenanceId').value = '';
            }
        }

        function openSupplyModal() {
            populateForkliftSelectForSupply();
            const modal = document.getElementById('supplyModal');
            if (modal) {
                // Definir data atual como padrão
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('supplyDate').value = today;
                modal.style.display = 'block';
            }
        }

        function closeSupplyModal() {
            const modal = document.getElementById('supplyModal');
            if (modal) {
                modal.style.display = 'none';
                document.getElementById('supplyForm').reset();
                document.getElementById('supplyId').value = '';
            }
        }

        function editForklift(index) {
            const forklift = forklifts[index];

            document.getElementById('forkliftId').value = forklift.id;
            document.getElementById('forkliftModel').value = forklift.model;
            document.getElementById('forkliftType').value = forklift.type;
            document.getElementById('forkliftCapacity').value = forklift.capacity;
            document.getElementById('forkliftHourMeter').value = forklift.hourMeter;
            document.getElementById('forkliftStatus').value = forklift.status;

            forklifts.splice(index, 1);

            openForkliftModal();
        }

        function deleteForklift(index) {
            if (confirm('Tem certeza que deseja excluir esta empilhadeira?')) {
                forklifts.splice(index, 1);
                loadForkliftsTable();
                updateDashboardStats();
            }
        }

        function editOperator(index) {
            const operator = operators[index];

            document.getElementById('operatorId').value = operator.id;
            document.getElementById('operatorName').value = operator.name;
            document.getElementById('operatorPhone').value = operator.phone;
            document.getElementById('operatorASO').value = operator.aso;
            document.getElementById('operatorNR').value = operator.nr;
            document.getElementById('operatorStatus').value = operator.status;

            operators.splice(index, 1);

            openOperatorModal();
        }

        function deleteOperator(index) {
            if (confirm('Tem certeza que deseja excluir este operador?')) {
                operators.splice(index, 1);
                loadOperatorsTable();
                updateDashboardStats();
            }
        }

        function editMaintenance(index) {
            const maintenance = maintenances[index];

            document.getElementById('maintenanceId').value = maintenance.id;
            document.getElementById('maintenanceForklift').value = maintenance.forklift;
            document.getElementById('maintenanceType').value = maintenance.type;
            document.getElementById('maintenanceDescription').value = maintenance.description;
            document.getElementById('maintenanceDate').value = maintenance.date;
            document.getElementById('maintenanceStatus').value = maintenance.status;
            document.getElementById('maintenanceResponsible').value = maintenance.responsible;

            maintenances.splice(index, 1);

            openMaintenanceModal();
        }

        function completeMaintenance(index) {
            const maintenance = maintenances[index];
            
            if (maintenance.status === 'Concluída') {
                maintenance.status = 'Agendada';
                
                // Reverter status da empilhadeira
                const forkliftIndex = forklifts.findIndex(f => f.id === maintenance.forklift);
                if (forkliftIndex !== -1) {
                    forklifts[forkliftIndex].status = 'Aguardando Manutenção';
                }
            } else {
                maintenance.status = 'Concluída';
                
                // Atualizar status da empilhadeira para "Em Operação"
                const forkliftIndex = forklifts.findIndex(f => f.id === maintenance.forklift);
                if (forkliftIndex !== -1) {
                    forklifts[forkliftIndex].status = 'Em Operação';
                }
            }
            
            loadMaintenancesTable();
            loadForkliftsTable();
            updateDashboardStats();
        }

        function deleteMaintenance(index) {
            if (confirm('Tem certeza que deseja excluir esta manutenção?')) {
                const maintenance = maintenances[index];
                
                // Se a manutenção não foi concluída, reverter status da empilhadeira
                if (maintenance.status !== 'Concluída') {
                    const forkliftIndex = forklifts.findIndex(f => f.id === maintenance.forklift);
                    if (forkliftIndex !== -1) {
                        forklifts[forkliftIndex].status = 'Em Operação';
                    }
                }
                
                maintenances.splice(index, 1);
                loadMaintenancesTable();
                loadForkliftsTable();
                updateDashboardStats();
            }
        }

        function editSupply(index) {
            const supply = supplies[index];

            document.getElementById('supplyId').value = supply.id;
            document.getElementById('supplyForklift').value = supply.forklift;
            document.getElementById('supplyFuelType').value = supply.fuelType;
            document.getElementById('supplyQuantity').value = supply.quantity;
            document.getElementById('supplyDate').value = supply.date;
            document.getElementById('supplyCost').value = supply.cost;
            document.getElementById('supplyHourMeter').value = supply.hourMeter;

            supplies.splice(index, 1);

            openSupplyModal();
        }

        function deleteSupply(index) {
            if (confirm('Tem certeza que deseja excluir este abastecimento?')) {
                supplies.splice(index, 1);
                loadSuppliesTable();
            }
        }

        function endOperation(index) {
            if (confirm('Deseja finalizar esta operação?')) {
                const operation = operations[index];
                
                // Liberar empilhadeira para uso
                const forkliftIndex = forklifts.findIndex(f => f.id === operation.forklift);
                if (forkliftIndex !== -1) {
                    forklifts[forkliftIndex].status = 'Em Operação';
                }
                
                operations.splice(index, 1);
                loadOperationsTable();
                loadForkliftsTable();
                updateDashboardStats();
            }
        }

        function deleteOperation(index) {
            if (confirm('Tem certeza que deseja excluir esta operação?')) {
                operations.splice(index, 1);
                loadOperationsTable();
                updateDashboardStats();
            }
        }

        function updateDashboardStats() {
            const totalForklifts = forklifts.length;
            const inOperation = forklifts.filter(f => f.status === 'Em Operação').length;
            const inMaintenance = forklifts.filter(f => f.status === 'Aguardando Manutenção').length;
            const stopped = forklifts.filter(f => f.status === 'Parada').length;

            const statNumbers = document.querySelectorAll('#dashboard .stat-number');
            if (statNumbers.length >= 4) {
                statNumbers[0].textContent = totalForklifts;
                statNumbers[1].textContent = inOperation;
                statNumbers[2].textContent = inMaintenance;
                statNumbers[3].textContent = stopped;
            }
            
            // Atualizar estatísticas de operadores
            const totalOperators = operators.length;
            const activeOperators = operators.filter(o => o.status === 'Ativo').length;
            
            // Verificar documentos próximos do vencimento
            const expiringASO = operators.filter(o => {
                const status = checkDocumentStatus(o.aso);
                return status.class === 'maintenance';
            }).length;
            
            const expiredASO = operators.filter(o => {
                const status = checkDocumentStatus(o.aso);
                return status.class === 'stopped';
            }).length;
            
            const statNumbersOperators = document.querySelectorAll('#dashboard .stats-grid:nth-child(2) .stat-number');
            if (statNumbersOperators.length >= 4) {
                statNumbersOperators[0].textContent = totalOperators;
                statNumbersOperators[1].textContent = activeOperators;
                statNumbersOperators[2].textContent = expiringASO;
                statNumbersOperators[3].textContent = expiredASO;
            }
        }

        function generateReport() {
            const reportType = document.querySelector('input[name="reportType"]:checked').value;
            const period = document.getElementById('reportPeriod').value;
            const format = document.querySelector('input[name="format"]:checked').value;
            
            alert(`Relatório de ${reportType} (${period}) gerado em formato ${format.toUpperCase()}!\n\nEm uma aplicação real, isso baixaria um arquivo.`);
        }

        function updateDateRange() {
            const period = document.getElementById('reportPeriod').value;
            const customDates = document.getElementById('customDates');
            
            if (period === 'custom') {
                customDates.style.display = 'flex';
                
                // Definir datas padrão (últimos 30 dias)
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 30);
                
                document.getElementById('startDate').value = start.toISOString().split('T')[0];
                document.getElementById('endDate').value = end.toISOString().split('T')[0];
            } else {
                customDates.style.display = 'none';
            }
        }

        function downloadReport(reportId) {
            alert('Download do relatório iniciado!');
        }

        window.onclick = function(event) {
            const forkliftModal = document.getElementById('forkliftModal');
            const operationModal = document.getElementById('operationModal');
            const operatorModal = document.getElementById('operatorModal');
            const maintenanceModal = document.getElementById('maintenanceModal');
            const supplyModal = document.getElementById('supplyModal');

            if (event.target === forkliftModal) {
                closeForkliftModal();
            }
            if (event.target === operationModal) {
                closeOperationModal();
            }
            if (event.target === operatorModal) {
                closeOperatorModal();
            }
            if (event.target === maintenanceModal) {
                closeMaintenanceModal();
            }
            if (event.target === supplyModal) {
                closeSupplyModal();
            }
        }

        // Inicializar o app quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
            
            // Adicionar event listeners aos botões de fechar modal
            document.querySelectorAll('.modal .close').forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    if (modal) {
                        modal.style.display = 'none';
                    }
                });
            });
        });