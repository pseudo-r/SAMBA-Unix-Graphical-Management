<script>var netdataTheme = 'slate'; // this is dark</script>
<script type="text/javascript" src="http://192.168.0.80:19999/dashboard.js"></script>
<script>
        NETDATA.options.current.destroy_on_hide = true;
        NETDATA.options.current.eliminate_zero_dimensions = true;
        NETDATA.options.current.concurrent_refreshes = false;
        NETDATA.options.current.parallel_refresher = true;
        var RELOAD_EVERY = 1;
        setTimeout(function() {
            location.reload();
        }, RELOAD_EVERY * 60 * 1000);
</script>

        <div style="width: 100%; height: 24vh; text-align: center; display: inline-block;">
            <div style="width: 100%; height: 15px; text-align: center; display: inline-block;">
                <div class="netdata-container-easypiechart" style="margin-right: 10px; width: 11%;" data-host="http://192.168.0.80:19999/" data-netdata="system.io" data-dimensions="in" data-chart-library="easypiechart" data-title="Disk Read" data-width="11%" data-points="360" data-common-units="system.io.mainhead" role="application">
                </div>
                <div class="netdata-container-easypiechart" style="margin-right: 10px; width: 11%;" data-host="http://192.168.0.80:19999/" data-netdata="system.io" data-dimensions="out" data-chart-library="easypiechart" data-title="Disk Write" data-width="11%" data-points="360" data-common-units="system.io.mainhead" role="application">
                </div>
                <div class="netdata-container-gauge" style="margin-right: 10px; width: 20%;" data-host="http://192.168.0.80:19999/" data-netdata="system.cpu" data-chart-library="gauge" data-title="CPU" data-units="%" data-gauge-max-value="100" data-width="20%" data-points="360" data-colors="#22AA99" role="application">
                </div>
                <div class="netdata-container-easypiechart" style="margin-right: 10px; width: 11%;" data-host="http://192.168.0.80:19999/" data-netdata="system.net" data-dimensions="received" data-chart-library="easypiechart" data-title="Net Inbound" data-width="11%" data-points="360" data-common-units="system.net.mainhead" role="application">
                </div>
                <div class="netdata-container-easypiechart" style="margin-right: 10px; width: 11%;" data-host="http://192.168.0.80:19999/" data-netdata="system.net" data-dimensions="sent" data-chart-library="easypiechart" data-title="Net Outbound" data-width="11%" data-points="360" data-common-units="system.net.mainhead" role="application">
                </div>
                <div class="netdata-container-easypiechart" style="margin-right: 10px; width: 9%;" data-host="http://192.168.0.80:19999/" data-netdata="system.ram" data-dimensions="used|buffers|active|wired" data-append-options="percentage" data-chart-library="easypiechart" data-title="Used RAM" data-units="%" data-easypiechart-max-value="100" data-width="9%" data-points="360" data-colors="#EE9911" role="application">
                </div>
            </div>
        </div>
        <div style="width: 100%; height: 24vh; text-align: center; display: inline-block;">
            <div style="width: 100%; height: 15px; text-align: center; display: inline-block;">
                <b>CPU usage of Samaba Server</b>
            </div>
            <div data-netdata="system.cpu" data-host="http://192.168.0.80:19999/" data-title="CPU Samaba Server" data-chart-library="dygraph" data-width="100%" data-height="100%" data-after="-300" data-dygraph-valuerange="[0, 100]"></div>
        </div>
        <div style="width: 100%; height: 24vh; text-align: center; display: inline-block;">
            <div style="width: 100%; height: 15px; text-align: center; display: inline-block;">
                <b>Memory usage of Samaba Server</b>
            </div>
            <div class="netdata-container-with-legend netdata-container-with-legend--bottom" id="chart_mem_available" data-netdata="mem.available" data-host="http://192.168.0.80:19999/" data-width="100%" data-height="260px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-360" data-id="london3_my-netdata_io_mem_available" data-colors="" data-decimal-digits="-1" data-legend-position="bottom" role="application" style="height: 260px; width: 100%;"></div>
        </div>
        <div style="width: 100%; height: 24vh; text-align: center; display: inline-block;">
            <div style="width: 100%; height: 15px; text-align: center; display: inline-block;">
                <b>TCP connections of Samaba Server</b>
            </div>
            <div class="netdata-container-with-legend netdata-container-with-legend--bottom" id="chart_ipv4_tcpsock" data-netdata="ipv4.tcpsock" data-host="http://192.168.0.80:19999/" data-width="100%" data-height="260px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-360" data-id="london3_my-netdata_io_ipv4_tcpsock" data-colors="" data-decimal-digits="-1" data-legend-position="bottom" role="application" style="height: 260px; width: 100%;"></div>
        </div>
        <div style="width: 100%; height: 24vh; text-align: center; display: inline-block;">
            <div style="width: 100%; height: 15px; text-align: center; display: inline-block;">
                <b>Disk space utilization of Samba server</b>
            </div>
            <div class="netdata-container-with-legend netdata-container-with-legend--bottom" id="chart_disk_space__run" data-netdata="disk_space._run" data-host="http://192.168.0.80:19999/" data-width="100%" data-height="260px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-360" data-id="london3_my-netdata_io_disk_space__run" data-colors="" data-decimal-digits="-1" data-legend-position="bottom" role="application" style="height: 260px; width: 100%;"></div>
        </div>
